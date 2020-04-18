/* For env file function */
const dotenv = require('dotenv');
dotenv.config();

if (!process.env.HTTP_HOST) {
  console.log('Please configure env file.')
  console.log('Copy .env.default to .env and configure the values.')
  return
}

// const http = require('http');
const https = require('https');
const app = require('./api/app');

const httpHost = process.env.HTTP_HOST || 'localhost';
const httpPort = process.env.HTTP_PORT || 8000;

// const server = http.createServer(app);
const fs = require('fs');
const options = {
  key: fs.readFileSync(process.env.HTTPS_KEY),
  cert: fs.readFileSync(process.env.HTTPS_CERT)
};
const server = https.createServer(options,app);
server.listen(httpPort, httpHost);
console.log('Server listening on '+ httpHost + ':' + httpPort)