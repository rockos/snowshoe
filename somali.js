/**
 * snowshoe application server
 * @version : 0.2
 * @date : 3.sep.2012
 */

/**
 * Module dependencies.
 */
'use strict';
var express = require('express')
    , routes = require('./routes')
    , rootDir = __dirname
    , RedisStore = require('connect-redis')(express)
    , opts = require('opts')
    , fs = require('fs')
    , http = require('http');

/* */
var privateKey = fs.readFileSync('etc/rockos.key').toString();

var certificate = fs.readFileSync('etc/rockos.crt').toString();  

/* below is secure server
var app = module.exports = express.createServer({key: privateKey, cert: certificate});
*/

var app = module.exports = express.createServer();
/* for express@v3
var app = express();
*/

var auth;

/* snowshoe modules */
var mongoose = require('mongoose');

var _schema_gndlog = new mongoose.Schema({

        //法人／会員／ゲスト
        jiss_name: String,
        //入庫/出庫
        jiss_state: String,
        // 2009.01---2012.12
        jiss_date: Date

    });

var lcsAp = require('./lib/ap/lcsap').create('appServer', rootDir, app);
var lcsUI = require('./lib/ap/lcsui').create('appServer');
var lcsDb = require('./lib/db/lcsdb').create('appServer', './etc/db.cf');
var lcsMog = require('./lib/db/lcsmog').create('appServer', './etc/mongo.cf', _schema_gndlog, "jisslogs" );


/* define command line arguments */
opts.parse([
            {'short': 'p',
                    'long': 'port',
                    'description': 'HTTP port',
                    'value': true,
                    'required': false
                    },
            ]);

var PORT = opts.get('port') || 3010

// Configuration
app.configure(function () {
        /* for express@v3
        app.engine('html', require('ejs').renderFile);
        */
        app.set('views', __dirname + '/views/jp');
        app.set('view engine', 'ejs');
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        //sessionを扱うときはrouterの前にこれを書かなければならない
        app.use(express.cookieParser());
        app.use(express.session({secret: "secret",
                        store: auth = new RedisStore({db:0}), /* default db number 0 */
                        cookie: {maxAge: 60 * 60 * 1000}}));
        /* cookie: {maxAge: 1 * 60 * 1000}})); 1 min */
        app.use(app.router);
        app.use(express.static(__dirname + '/public'));
    });

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
        app.use(express.errorHandler());
});

/* 画面プログラムの登録 */
lcsUI.config({"map" : "./controller/map.json"});
lcsUI.config({"frame" : "./views/jp/framenavi.json"});
lcsUI.config({"tags" : "./views/jp/pagetags.json"});

/* ルーティング処理 */
app.get('/', lcsUI.login);
app.get('/logout', lcsUI.logout);
app.get('/scr/:id', lcsUI.doAction);
app.get('/404', lcsUI.notFound);
app.post('/scr/:id', lcsUI.doAction);
app.post('/check', lcsUI.checkUser);
//app.post('/check', lcsUI.doAction);

//console.log('__dirname =',__dirname);

app.listen(PORT, function(){
        console.log("Snowshoe server(node v0.6) listening on port %d in %s mode", app.address().port, app.settings.env);
});

/* this is for express@v3
var server = http.createServer(app).listen(PORT, function(){
        //        console.log("Snowshoe server(node v0.8) listening on port %d in %s mode", app.address().port, app.settings.env);
        console.log("Snowshoe server(node v0.8) listening on port %d in %s mode", PORT, app.settings.env);
        });
*/
/*
 * 例外処理
 */
process.on('uncaughtException', function (error) {

        console.log("system error: " + error);
        console.log("system error trace: " + error.stack);
        lcsAp.log('uncaughtException: ' + error);
        lcsAp.log('uncaughtException trace: ' + error.stack);
    });

// socket.io add 2012.06.30 takahashi

var socketio = require('socket.io').listen(app);

/* this is for express@v3
    var socketio = require('socket.io').listen(server);
*/



global['auth'] = auth;
// add 2012.06.30 takahashi
global['sck_io'] = socketio;

/* Gloval Object */
global['lcsAp'] = lcsAp;
global['lcsUI'] = lcsUI;
global['lcsDb'] = lcsDb;


/*
 *  バックグラウンドで動く処理
 *  add 2012.06.30 takahashi
 */
require("./controller/mgr/mgrmon").main();
require("./controller/mgr/mgragv").main();
