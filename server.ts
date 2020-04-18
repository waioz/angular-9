import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
const domino = require('domino');
const dotenv = require('dotenv');
dotenv.config();
// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  // Start up the Node server
  if (!process.env.HTTP_HOST) {
    console.log('Please configure env file.')
    console.log('Copy .env.default to .env and configure the values.')
    return
  }
  const server = require('./api/app');
  const distFolder = join(process.cwd(), 'dist/waioz-angular-v9/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const win = domino.createWindow(indexHtml);
  global['window'] = win;
  global['document'] = win.document;

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  // const http = require('http');
  const https = require('https');
  const httpHost = process.env.HTTP_HOST || 'localhost';
  const httpPort = process.env.HTTP_PORT || 5200;

  // const http_server = http.createServer(server);
  const fs = require('fs');
  const options = {
    key: fs.readFileSync(process.env.HTTPS_KEY),
    cert: fs.readFileSync(process.env.HTTPS_CERT)
  };
  const http_server = https.createServer(options,server);
  http_server.listen(httpPort, httpHost, () => {
    console.log(`Node Express server listening on http://${httpHost}:${httpPort}`);
  });
}


// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  app();
}

export * from './src/main.server';
