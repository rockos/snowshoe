/**
 * mongodbインターフェース
 *
 * @modlue lcsMog
 */
var lcsAp = require('../ap/lcsap').create('LCSMOG');

var mongoose = require('mongoose');

/*
 * Constructor
 *
 */
function lcsMog(nm, cf, scmOb, modelNm) {

    var _name = nm || "rockos",
        _db = "";
    var instancs = this;
    var _conf
        , _conStr
        , _schema_gndlog
        ,_model_gndlog
    /* 設定ファイル読み込み */
    _conf = JSON.parse(require('fs').readFileSync(cf));

    /*
     * mongodbに接続
     */
   _conStr = 'mongodb://' + _conf.host + '/' + _conf.database;
    //  mongoose.connect('mongodb://localhost/test');
    mongoose.connect(_conStr);

    /**
     *
     * Schemaの定義
     * Default Schemaから新しいSchemaを定義
     */

    _schema_gndlog = scmOb;
    //_schema_gndlog = new mongoose.Schema({
    //        mc_begin: String,
    //        mc_name: String,
    //        mc_state: String,
    //        mc_date: Date
    //    });

    /* 
     * モデル化  model('モデル名', '定義したスキーマクラス')
     */
    //_model_gndlog = mongoose.model('gndlog', _schema_gndlog);
    _model_gndlog = mongoose.model(modelNm, _schema_gndlog);



   /* 定義したときの登録名で呼び出し */
    //    var gndLog = mongoose.model('gndlog');



    lcsMog.prototype.disconnect = function() {
        mongoose.disconnect();
    };

    /**
     *
     * @method findAll
     *
     */
    lcsMog.prototype.findAll = function(callback) {
        _model_gndlog.find(function(err, docs) {

                callback(err, docs)
            });
    };

    /**
     *
     * @method findById
     */
    lcsMog.prototype.findById = function(id, callback) {
        _model_gndlog.findById(id, function(err) {
                callback()
            });
    };
    
    /**
     *
     * @method findById
     */
    lcsMog.prototype.find = function(param, callback) {
        _model_gndlog.find(param, function(err, docs) {
                callback(err, docs)
            });
    };

    /**
     *
     * @method findLast
     */
    lcsMog.prototype.findLast = function(param, callback) {
        _model_gndlog.find(param, {comments:{$slice:-1}}, function(err, docs) {
                callback(err, docs)
            });
    };

    /**
     *
     * @method findCount
     */
    lcsMog.prototype.findCount = function(param, callback) {
        _model_gndlog.find(param).count( function(err, docs) {
                callback(err, docs)
            });
    };

    /**
     * @method save document to specified collection.
     * @param {String} schema name
     * @params {[Array] 
     * @params {function} callback
     */
    lcsMog.prototype.save = function(scm, params, callback) {

        //if (scm != "gndlog") {
        //    return callback("","");
        //}

       _db = new _model_gndlog();
        for (var k in params) {
            _db[k] = params[k];
        }

       _db.save(function(err) {
                callback(err);
            });
    };

    /*
     * クエリ発行
     *
     * @method query
     * @params {[String]}funcs, {[Array]}ary
     *
     */
    lcsMog.prototype.query = function () {
        _model_gndlog.query(arguments);
    }
    /*
     * 2回目以降はインスタンスだけ返す
     */
    lcsMog = function () {
        return instancs;
    };


}; /* END of constructor */

/**
 * 
 * creates an instance
 */
lcsMog.create = function(nm, file, scm, coll) {
    return new lcsMog(nm, file, scm, coll);
};

/**
 * default comparison function
 */
if (typeof exports == 'object' && exports === this) module.exports = lcsMog;