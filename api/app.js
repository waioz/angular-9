const express = require('express'); // for api framework
const bodyParser = require('body-parser'); // for accept the all form data i.e get, post, on, put
const mongoose = require('mongoose'); // for access the models
const fs = require('fs');
const fileUpload = require('express-fileupload');
const app = express();
const env = process.env

mongoose.set('useCreateIndex', true); // mongoose default config settings
mongoose.connect(env.MONGO_DB_URL, { useNewUrlParser: true }); // mention database name
app.use(fileUpload());	
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});
const listRoutes = require('./app/routes/lists')
app.use(async(req, res, next) => {
    const url = req.url;
    const uriArray = url.split('/');
    if (uriArray[1] !== 'api') {
        if (uriArray[1] == "uploads") {
            const pathImage = uriArray[3];
            const extension = pathImage.split('.').pop();
            const contentType = 'image/' + extension;
            const file = "." + url;
            fileToLoad = fs.readFileSync(file);
            res.writeHead(200, { 'Content-Type': contentType });
            return res.end(fileToLoad, 'binary');
        }
    }
    next()
});


/* Api Response Middleware */
app.use((req, res, next) => {
    if (req.method.toLowerCase() == 'post') 
    {
        res.apiResponse = (status, message, data = null) => {
            var message = message;
            res.send({
                status,
                message,
                data
            })
            return res.end()
        }
        var contype = req.headers['content-type'];
        if ((!contype || contype.indexOf('multipart/form-data') !== 0) && !req.body.params) {
            return res.apiResponse(false, "Params is required")
        }
        var params = req.body.params
        if ((typeof params).toLowerCase() !== 'object') {
            try {
                if (params != undefined) {
                    params = JSON.parse(params)
                }

            } catch (e) {
                return res.apiResponse(false, "Params is not a valid JSON")
            }
            if ((typeof params).toLowerCase() !== 'object' && (typeof params).toLowerCase() !== 'undefined') {
                return res.apiResponse(false, "Params is not a valid JSON")
            }
        }
        req.bodyParams = params
    }
    next()
})


app.use('/api/list', listRoutes);
module.exports = app;