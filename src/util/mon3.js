'use strict';

var mongoose = require('mongoose');

var _schema_gndlog = new mongoose.Schema({

     //法人／会員／ゲスト
     jiss_name: String,
     //checkin/out
     jiss_state: String,
     // 2009.01---2012.12
     jiss_date: Date

});

var rootdir = process.env.LOCOS_DEV;
var lcsAp = require(rootdir + 'lib/ap/lcsap').create('MON');
var lcsMog = require(rootdir + 'lib/db/lcsmog').create('MON', rootdir+'etc/mongo.cf', _schema_gndlog, "jisslog" );



function readDb() {
    console.log('read from MongoDB');
    var rand = Math.floor( Math.random() * 1400 );
    var d = new Date(2009,0,rand);

    //    lcsMo.find( ({mc_date:{$gt:ISODate("2012-07-17")}}), function(err, docs) {
    //lcsMo.find({"mc_date":{$gte:ISODate("2012-07-17T04:39:00Z")}}, function(err, docs) {
    lcsMog.save("jisslog"  ,
               {
                   jiss_name : '法人' ,
                   jiss_state: '入庫',
                   jiss_date:  d
                }, 
               function(err, docs) {
                   if (err) {
                       lcsap.log(err);
                   }
               });

      lcsMog.find({}, function(err, docs) {
            //lcsMo.findAll( function(err, docs) {
            if (!err || docs.length != "undefined") {
                for (var i = 0; i < docs.length; i++ ) {
                    console.log(docs[i]);
                }
            }
            console.log(docs.length);
            process.exit();

        });
}

readDb();

