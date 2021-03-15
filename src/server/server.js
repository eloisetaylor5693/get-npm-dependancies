const http = require('http');
const getDeps = require('./get-npm-dependencies');

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

const server = http.createServer(async function (req, res) {

    console.log(req.url);
    const packageName = req.url.replace('/?package=', '');

    if (packageName === '/') {
        res.writeHead(200, headers);
        const response = JSON.stringify({ error: 'Please give an npm package in the url' });
        res.write(response);
        res.end();

        return;
    }
    console.log(packageName);

    await getDeps.GetAllDependencies(packageName)
        .then(data => {
            res.writeHead(200, headers);
            const response = JSON.stringify(data);
            res.write(response);
            res.end();
        })
        .catch(error => {
            res.writeHead(400, headers);
            const response = JSON.stringify({ error: error.message });
            res.write(response);
            res.end();
        });
});

server.listen(5000);

console.log('Node.js web server is running...  at localhost:5000')