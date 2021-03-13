const http = require('http');
const getDeps = require('get-dependencies');

const server = http.createServer(async function (req, res) {

    console.log(req.url);

    res.writeHead(200, { 
        'Content-Type': 'text/html', 
        'Access-Control-Allow-Origin': '*' });

    // get from url
    const packageName = "snyk";

    const dependencies = await GetDependencies(packageName);
    const response = JSON.stringify(dependencies);
    console.log(response);
    res.write(response);
    res.end();

});

server.listen(5000);

async function GetDependencies(packageName) {
    const dependencies = await getDeps.getByName(packageName)
        .then((result) => {
            // result is an array of dependencies of the npm package
            // console.log(result);
            return result;
        })
        .catch(err => {console.log(err.message);});

    let treeView = dependencies;

    // console.log(treeView);
    //cache each call

    return dependencies;
};

console.log('Node.js web server at port 5000 is running..  at localhost:5000')