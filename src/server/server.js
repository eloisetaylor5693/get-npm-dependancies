const http = require('http');
const getDeps = require('./get-npm-dependencies');

const server = http.createServer(async function (req, res) {

    console.log(req.url);

    res.writeHead(200, { 
        'Content-Type': 'text/html', 
        'Access-Control-Allow-Origin': '*' });

    // get from url
    const packageName = "snyk";

    const dependencies = await getDeps.GetDependencies(packageName);
    const response = JSON.stringify(dependencies);
    console.log(response);
    res.write(response);
    res.end();
});

server.listen(5000);

console.log('Node.js web server at port 5000 is running..  at localhost:5000')