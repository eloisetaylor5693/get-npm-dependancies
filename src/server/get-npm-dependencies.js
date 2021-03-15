const getDeps = require('get-dependencies');
Cache = require('cache');

const oneMinuteInMs = 60000;
const cacheTtl = oneMinuteInMs * 60;

const GetDependencies = async (packageName) => {
    if (!packageName) {
        throw new Error('No npm package specified.  Please amend the url and try again.')
    }

    const dependencyCache = new Cache(cacheTtl, 'cache-data.json');

    let dependencies = dependencyCache.get(packageName);

    if (dependencies) {
        console.log(`Got dependencies from cache ${packageName}`);
    } else {
        console.log(`Getting dependencies from API ${packageName}`);

        dependencies = await getDeps.getByName(packageName)
            .then(data => data)
            .then((result) => {
                return {
                    package: packageName,
                    dependencies: result
                };
            });

        dependencyCache.put(packageName, dependencies);
    }

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
                                .filter(y => y.package === x)
                                .map(z => z.dependencies)
                        }
                    })
            };
        })
};

exports.GetDependencies = GetDependencies;