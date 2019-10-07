'use strict'

var http = require('http');

const app = function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");

}

initServer(app).then(() => {console.log("Listening on port 3000")})



async function initServer(app) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);

    const errorHandler = err => {
      console.log(`Unable to start WEB server: ${err.message}`);
      server.removeListener('listening', successHandler);
      reject(err);
    };

    const successHandler = () => {
      console.log(`WEB server has been successfully started on port 3000`);
      server.removeListener('error', errorHandler);
      resolve(app);
    };
    server.once('error', errorHandler);
    server.once('listening', successHandler);

    // Listen on provided port, on all network interfaces.
    server.listen(3000);
  });
}
