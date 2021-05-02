const axios = require('axios');
Cache = require('cache');

const oneMinuteInMs = 60000;
const cacheTtl = oneMinuteInMs * 60;

const GetDependencies = async (packageName) => {
    if (!packageName) {
        throw new Error('No npm package specified.  Please amend the url and try again.')
    }
    console.log(packageName);


    let dependencies = await axios.get(`https://registry.npmjs.org/${packageName}/latest`)
        .then(response => {
            return response.data;
        })
        .then(response => {
            if (!response.dependencies) {
                return;
            }

            const dependencyObjectKeys = Object.keys(response.dependencies);
            const dependencies = dependencyObjectKeys.filter(x => x) 

            return {
                package: packageName,
                dependencies: dependencies,
                version: response.version
            }
        });

    return dependencies;
};


exports.GetAllDependencies = async (packageName) => {
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
                                .filter(a => a)
                                .filter(y => y.package === x)
                                .map(z => z.dependencies)
                        }
                    })
            };
        })
};

exports.GetDependencies = GetDependencies;