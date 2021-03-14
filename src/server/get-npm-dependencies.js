const getDeps = require('get-dependencies');
Cache = require('cache');

const oneMinuteInMs = 60000;
const cacheTtl = oneMinuteInMs * 60;

exports.GetDependencies = async (packageName) => {
    
    const dependencyCache = new Cache(cacheTtl, 'cache-data.json');

    let dependencies = dependencyCache.get(packageName);

    if (dependencies) {
        console.log('Got dependencies from cache');
    } else {
        console.log('Getting dependencies from API');

        dependencies = await getDeps.getByName(packageName)
            .then((result) => {
                return result;
            })
            .catch(err => { console.log(err.message); });

        dependencyCache.put(packageName, dependencies);
    }

    //let treeView = dependencies;
    // console.log(treeView);

    return dependencies;
};