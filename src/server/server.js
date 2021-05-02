const http = require('http');
const getDeps = require('./get-npm-dependencies');

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

const server = http.createServer(async function (request, response) {

    console.log(request.url);
    const packageName = request.url.replace('/?package=', '');

    if (packageName === '/') {
        writeResponse(response, 400, { error: 'Please give an npm package in the url' });
        return;
    }
    console.log(packageName);

    await getDeps.GetAllDependencies(packageName)
        .then(data => {
            writeResponse(response, 200, data);
        })
        .catch(error => {
            console.log(error);
            writeResponse(response, 400, { ...error });
        });
});

function writeResponse(response, httpStatusCode, data) {
    response.writeHead(httpStatusCode, headers);
    const responseBody = JSON.stringify(data);
    response.write(responseBody);
    response.end();
}

server.listen(5000);

console.log('Node.js web server is running...  at localhost:5000')