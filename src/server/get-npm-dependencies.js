const getDeps = require('get-dependencies');

exports.GetDependencies = async (packageName) => {
    const dependencies = await getDeps.getByName(packageName)
        .then((result) => {
            return result;
        })
        .catch(err => { console.log(err.message); });

    //let treeView = dependencies;
    // console.log(treeView);
    //cache each call

    return dependencies;
};