//#!/bin/env node
////  OpenShift sample Node application
//var express = require('express');
//var fs      = require('fs');
//
//
///**
// *  Define the sample application.
// */
//var SampleApp = function() {
//
//    //  Scope.
//    var self = this;
//
//
//    /*  ================================================================  */
//    /*  Helper functions.                                                 */
//    /*  ================================================================  */
//
//    /**
//     *  Set up server IP address and port # using env variables/defaults.
//     */
//    self.setupVariables = function() {
//        //  Set the environment variables we need.
//        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
//        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
//
//        if (typeof self.ipaddress === "undefined") {
//            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
//            //  allows us to run/test the app locally.
//            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
//            self.ipaddress = "127.0.0.1";
//        };
//    };
//
//
//    /**
//     *  Populate the cache.
//     */
//    self.populateCache = function() {
//        if (typeof self.zcache === "undefined") {
//            self.zcache = { 'index.html': '' };
//        }
//
//        //  Local cache for static content.
//        self.zcache['index.html'] = fs.readFileSync('./index.html');
//    };
//
//
//    /**
//     *  Retrieve entry (content) from cache.
//     *  @param {string} key  Key identifying content to retrieve from cache.
//     */
//    self.cache_get = function(key) { return self.zcache[key]; };
//
//
//    /**
//     *  terminator === the termination handler
//     *  Terminate server on receipt of the specified signal.
//     *  @param {string} sig  Signal to terminate on.
//     */
//    self.terminator = function(sig){
//        if (typeof sig === "string") {
//           console.log('%s: Received %s - terminating sample app ...',
//                       Date(Date.now()), sig);
//           process.exit(1);
//        }
//        console.log('%s: Node server stopped.', Date(Date.now()) );
//    };
//
//
//    /**
//     *  Setup termination handlers (for exit and a list of signals).
//     */
//    self.setupTerminationHandlers = function(){
//        //  Process on exit and signals.
//        process.on('exit', function() { self.terminator(); });
//
//        // Removed 'SIGPIPE' from the list - bugz 852598.
//        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
//         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
//        ].forEach(function(element, index, array) {
//            process.on(element, function() { self.terminator(element); });
//        });
//    };
//
//
//    /*  ================================================================  */
//    /*  App server functions (main app logic here).                       */
//    /*  ================================================================  */
//
//    /**
//     *  Create the routing table entries + handlers for the application.
//     */
//    self.createRoutes = function() {
//        self.routes = { };
//
//        self.routes['/asciimo'] = function(req, res) {
//            var link = "http://i.imgur.com/kmbjB.png";
//            res.send("<html><body><img src='" + link + "'></body></html>");
//        };
//
//        self.routes['/'] = function(req, res) {
//            res.setHeader('Content-Type', 'text/html');
//            res.send(self.cache_get('index.html') );
//        };
//    };
//
//
//    /**
//     *  Initialize the server (express) and create the routes and register
//     *  the handlers.
//     */
//    self.initializeServer = function() {
//        self.createRoutes();
//        self.app = express.createServer();
//
//        //  Add handlers for the app (from the routes).
//        for (var r in self.routes) {
//            self.app.get(r, self.routes[r]);
//        }
//    };
//
//
//    /**
//     *  Initializes the sample application.
//     */
//    self.initialize = function() {
//        self.setupVariables();
//        self.populateCache();
//        self.setupTerminationHandlers();
//
//        // Create the express server and routes.
//        self.initializeServer();
//    };
//
//
//    /**
//     *  Start the server (starts up the sample application).
//     */
//    self.start = function() {
//        //  Start the app on the specific interface (and port).
//        self.app.listen(self.port, self.ipaddress, function() {
//            console.log('%s: Node server started on %s:%d ...',
//                        Date(Date.now() ), self.ipaddress, self.port);
//        });
//    };
//
//};   /*  Sample Application.  */
//
//
//
///**
// *  main():  Main code.
// */
//var zapp = new SampleApp();
//zapp.initialize();
//zapp.start();
//

var express = require('express');
//var passport      = require('passport');
//var session = require('express-session');
//var cookieParser = require('cookie-parser');
var app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());



//var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
//var connectionString ='mongodb://127.0.0.1:27017/airlinesSearchingSystem01';
//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//        process.env.OPENSHIFT_APP_NAME;
//}
//
//
//var db = mongoose.connect(connectionString);
//
////var multer = require('multer');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//
//
//
////Start Using PassportJS
//app.use(session({
//    secret: 'this is the secret',
//    resave: true,
//    saveUninitialized: true
//}));
//app.use(cookieParser());
//app.use(passport.initialize());
//app.use(passport.session());




//app.use(session({ secret: process.env.PASSPORT_SECRET }));
app.use(express.static(__dirname + '/public/client'));
//require("./public/server/app.js")(app, mongoose, db);
//var sendgrid = require("sendgrid")("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");
////app.post('/api/project/airlines/contact');
//var email = new sendgrid.Email();
//
//email.addTo("zhang.ze@husky.neu.edu");
//email.setFrom("TripSearching");
//email.setSubject("Sending with SendGrid is Fun");
//email.setHtml("This is a test02");
//
//sendgrid.send(email);

require("./public/server/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);
