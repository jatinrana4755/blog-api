//this is needed for importing expressjs into our application.
const express = require('express')
const http=require('http')
const appConfig= require('./config/appConfig')
const fs = require('fs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const bodyParser = require('body-parser')
const models = require('./models/Blog')

const globalErrorMiddleware= require('./middlewares/appErrorHandler')
const routeLoggerMiddleware= require('./middlewares/routeLogger')
const helmet = require('helmet')
const logger=require('./libs/loggerLib')





//declaring   an instance or creating the application instance.
const app = express()

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(globalErrorMiddleware.globalErrorHandler)
app.use(routeLoggerMiddleware.logIp)
app.use(helmet())

//Bootstrap models

let modelsPath='./models'

fs.readdirSync(modelsPath).forEach(function(file){
    if(-file.indexOf('.js'))require(modelsPath + '/' +file)

})//end Bootstrap models.


//Bootstrap route

let routesPath='./routes'

fs.readdirSync(routesPath).forEach(function(file) {
    
    if(-file.indexOf('.js')){

        console.log("including the following file")

        console.log(routesPath+'/'+file)

        let route=require(routesPath + '/' + file);
        
        route.setRouter(app);
    }
});//end bootstrap route

//calling global 404 handler after route

app.use(globalErrorMiddleware.globalNotFoundHandler)
//end  global 404 handler.

//listening the server - creating a local server.
app.listen(appConfig.port, () => {
    
    console.log('Example app listening on port 3000!');

//creating the mongo db connnection here.

let db = mongoose.connect(appConfig.db.uri,{useMongoClient:true});


})

//handling mongoose connection here

mongoose.connection.on('error',function(err){
console.log('database connection error');
console.log(err);


});//end mongoose connection here.

//hanling mongoose success event.
mongoose.connection.on('open',function(err){
    if(err){
    console.log('database error');
    console.log(err); 
        
    }
    else{
    console.log('database connection open success');
    }
    });//end mongoose connection open handler.
    