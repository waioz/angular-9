<p align="center">
  <h1 align="center">Angular Version 9 - Waioz</h1>
  <p align="center">
    Angular 9 + Bootstrap
    <br>
    Browser Support(Polyfill) + PWA(with Service Workers) + SSR + Lazy Loading + Google Maps
    <br>
    Node JS + Express + MongoDB
    <br>
    <a href="https://tryout.waioz.com:9009/" target="_blank">Demo Page</a>
    <br>
  </p>
</p>

## Table of contents

- [Front end](#front-end)
- [Back end](#back-end)
- [Documentation](#documentation)
- [Step By Step Quide](#step-by-step-quide)

## Front end

```bash
# clone the repo
git clone https://github.com/waioz/angular-9

# change directory
cd angular9-app

# install the repo with npm
npm install

# start the server
npm start

```
in your browser go to [http://localhost:4200](http://localhost:4200) 

### Tests
* `npm run lint`
* `npm run test`
* `npm run e2e`

### Compilation
* `npm run build`       ( without SSR)
* `npm run build:ssr`   ( with SSR)

### Production
* `npm run serve:ssr`
* in your browser [http://localhost:4000](http://localhost:4000) 

## Back end
### Path
* `/api`

### Database Creation
* `change login and password for mongodb in file app.js`
* `dbname":"waioz-sample"`

### Developpement
* `npm run start`
* in your browser [http://localhost:5200](http://localhost:5200) 


## Documentation

### Author
* Updated : 16/04/2020
* Author  : A.K.Praveen Kumar


## Step By Step Quide

### Install the Angular CLI
* To install the CLI using npm, open a terminal/console window and enter the following command:

```bash
# Install the Angular CLI globally
npm install -g @angular/cli

# provide your project name instead waioz-angular-v9, as shown here
ng new waioz-angular-v9
```
* Set routing option yes.
* choose your styling platform extension

### Browser Support

* install web-animation-js for browser support. Old browsers does not support some features of Angular.
<a href="https://angular.io/guide/browser-support" target="_blank">Learn more</a>
```bash
# install the optional web animations polyfill
npm install --save web-animations-js
```

* You can then add the import statement in the src/polyfills.ts<br>

### Server Side Rendering (SSR) - Angular Universal

* To create the server-side app module, app.server.module.ts, run the following CLI command.
<a href="https://angular.io/guide/universal" target="_blank"> Learn more</a>
```bash
ng add @nguniversal/express-engine
```
```bash
npm run build:ssr && npm run serve:ssr
```
* Open a browser and navigate to http://localhost:4000/.<br>

### Adding a service worker to your project - PWA

* To set up the Angular service worker in your project, use the CLI command ng add @angular/pwa. It takes care of configuring your app to use service workers by adding the service-worker package along with setting up the necessary support files. 
<a href="https://angular.io/guide/service-worker-getting-started" target="blank" >Learn more</a>
```bash
#ng add @angular/pwa --project *project-name*
ng add @angular/pwa --project waioz-angular-v9
```
```bash
npm run build:ssr && npm run serve:ssr
```
* Open a browser and navigate to http://localhost:4000/.<br>
* So PWA creates the application in mobile phones. First time you opens your site in browser it will asks you to save as PWA. If you click yes<br>
 it installed in your mobile and it reacts like normal applicaton. This is pretty much and yeah its good but if you release any updates in your website it will not reflect in already installed application right?. No problem. Here is the solution for that "Service worker communication"
 <a href="https://angular.io/guide/service-worker-communications" target="_blank">Learn more</a>

### Bootstrap
* Add bootstrap in your project
```bash
npm install bootstrap --save

#add this line in style.css
@import "~bootstrap/dist/css/bootstrap.css";

```

### Lazy Loading Modules
* First prepare your module structure based on your project requirement and page routing
```bash
#http://domain/{route}
#                  {modulename}     {route path}  {parent module}
ng generate module homepage --route home --module app.module
```
