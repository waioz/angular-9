/* For env file function */
const dotenv = require('dotenv');
dotenv.config();

if (!process.env.HTTP_HOST) {
  console.log('Please configure env file.')
  console.log('Copy .env.default to .env and configure the values.')
  return
}

const fs = require('fs');
if(process.env.HTTPS=="true")
{
  var http = require('https');
  var options = {
    key: fs.readFileSync(process.env.HTTPS_KEY),
    cert: fs.readFileSync(process.env.HTTPS_CERT)
  };
  
}
else
{
  var http = require('http');
  var options = {};
}
  
const app = require('./api/app');
// const socketController = require('./node_app/app/controllers/socket_controller')


const httpHost = process.env.HTTP_HOST || 'localhost';
const httpPort = process.env.API_PORT || 8000;

const server = http.createServer(options,app);
// const io = require('socket.io')(server);
// global.io = io; //added
// io.sockets.on('connection', socketController.respond );
server.listen(httpPort, httpHost);
console.log('API listening on '+ httpHost + ':' + httpPort)