const getDeps = require('get-dependencies');
Cache = require('cache');
const needle = require('needle');
const axios = require('axios');

const oneMinuteInMs = 60000;
const cacheTtl = oneMinuteInMs * 60;

const GetDependencies = async (packageName) => {
    if (!packageName) {
        throw new Error('No npm package specified.  Please amend the url and try again.')
    }

    const dependencyCache = new Cache(cacheTtl, 'cache-data.json');

    let dependencies = dependencyCache.get(packageName);

    if (dependencies) {
        // console.log(`Got dependencies from cache ${packageName}`);
    } else {
        // console.log(`Getting dependencies from API ${packageName}`);

        dependencies = await axios.get(`https://registry.npmjs.org/${packageName}/latest`)
        //await getDeps.getByName(packageName)
            .then(response => response.data)
            .then(data => data.dependencies.filter(x => x))
            .then((result) => {
                const dependencyKeys = Object.keys(result.dependencies);
                console.log(dependencyKeys);
                const dependencies = dependencyKeys.filter(x => x);
                return {
                    package: packageName,
                    dependencies: dependencies,
                    version: result.version
                };
            });

        dependencyCache.put(packageName, dependencies);
    }

    return dependencies;
};


// response structure:
    // [ {
    //         package: 'snyk',
    //         dependencies: {
    //             [
    //                 {
    //                     package: 'diff',
    //                 }
    //             ]

    //         }
    //     }
    // ]


exports.GetAllDependencies = async (packageName) => {

    console.log(packageName);

    const dependencies = await GetDependencies(packageName)
        .then(data => data)
        .then(data => data.dependencies.map(x => {
            return this.GetAllDependencies(x);
        }))
        .catch(error => {
            console.log(error.message)
            throw new Error(error.message)
        });
    
    return Promise.all(dependencies);
}


exports.GetDependenciesAndSubDependencies = async (packageName) => {
    if (!packageName) {
        throw new Error('No npm package specified.  Please amend the url and try again.');
    }

    const firstLevelDependencies = await GetDependencies(packageName)
        .then(data => data)
        .catch(error => {
            console.log(error.message)
            throw new Error(error.message)
        });

    const secondLevelDependencies = firstLevelDependencies.dependencies.map(async (dependency) => {
        if (!dependency) { return; }
        if (typeof dependency !== 'string') { return; }

        return await GetDependencies(dependency)
            .then(x => x);
    });

    return Promise.all(secondLevelDependencies)
        .then((results) => {
            return {
                package: packageName,
                dependencies: firstLevelDependencies.dependencies
                    .map(x => {
                        return {
                            package: x,
                            dependencies: results
                                .filter(y => y.package === x)
                                .map(z => z.dependencies)
                        }
                    })
            };
        })
};

exports.GetDependencies = GetDependencies;