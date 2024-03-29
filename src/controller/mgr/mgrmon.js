//var LCSAP = require('../../lib/ap/lcsap');
//var lcsAp = LCSAP.create('MGRMON');

/**
 * デモ用のデータを作成する
 * @module createDemo
 * @param  none
 * @date   30/jun/2012
 */
function createDemo() {
    /*
    var sql = "",
        ary = [],
        key = "showshoe",
        valu = [999,0,0,27,128,0,30,0,0,0,0];

    sql = "update demo set demo1=?, demo2=?, demo3=?, demo4=?, demo5=?, demo6=? " +
          "where demo_key=? ";
    ary = [valu[1],
           valu[2],
           valu[3],
           valu[4],
           valu[5],
           valu[6],
           key];
    client.query(sql, ary, function(err, fields) {
        if (err){
            lcsAp.log( err );
            return;
        }
        modifyDemo();
    });
    */
}
/**
 * デモ用のデータを更新する
 * @module modifyDemo
 * @param  none
 * @date   30/jun/2012
 */
function modifyDemo() {

    /*
    var sql = "",
        ary = [],
        key = "showshoe",
        valu = [999,0,0,0,0,0,0,0,0,0,0],
        rand = 0,
        data = {};

    sql = 
        "select " +
        "  demo1, demo2, demo3, demo4, demo5, demo6, demo7, demo8, demo9, demo10 " +
        "from demo " +
        "where demo_key=? ";
    ary = [key];

    client.query(sql, ary, function(err, results, fields) {
        if (err){
            lcsAp.log( err );
            return;
        }
        data = results;

        rand = Math.floor( Math.random() * 10 );
        if( !rand ) valu[1]++;

        rand = Math.floor( Math.random() * 10 );
        if( !rand ) valu[2]++;

        rand = Math.floor( Math.random() * 2 );
        if( rand===1 && data[0].demo3 < 30 ) valu[3]++;
        else if( rand===0 && data[0].demo3 > 22 ) valu[3]--;

        rand = Math.floor( Math.random() * 4 );
        if( rand===1 && data[0].demo4 < 140 ) valu[4]++;
        else if( rand===2 && data[0].demo4 > 105 ) valu[4]--;

        rand = Math.floor( Math.random() * 6 );
        if( rand===1 && data[0].demo5 < 100 ) valu[5]++;
        if( rand===0 && data[0].demo5 > 0 ) valu[5]--;
        if( rand===3 && data[0].demo5 < 91 ) valu[5]+=10;
        if( rand===2 && data[0].demo5 > 9 ) valu[5]-=10;
        if( rand===5 && data[0].demo5 < 97 ) valu[5]+=4;
        if( rand===4 && data[0].demo5 > 3 ) valu[5]-=4;

        rand = Math.floor( Math.random() * 2 );
        if( rand===1 && data[0].demo6 < 50 ) valu[6]++;
        if( rand===0 && data[0].demo6 > 20 ) valu[6]--;

        sql = "update demo set demo1=demo1+?, demo2=demo2+?, demo3=demo3+?, demo4=demo4+?, " +
              "    demo5=demo5+?, demo6=demo6+? " +
              "where demo_key=? ";
        ary = [valu[1],
               valu[2],
               valu[3],
               valu[4],
               valu[5],
               valu[6],
               key];
        client.query(sql, ary, function(err, fields) {
            if (err){
                lcsAp.log( err );
                return;
            }

            setTimeout( modifyDemo, 1000 );
        });
    });
    */
}

/**
 * 作業モニタ画面へデータを送る
 *    タイマでポーリングします
 * @module showData
 * @param  none
 * @date   30/jun/2012
 */
function showData() {

    var valu = [999,24,150,0,0,0,0,0,0,0,0],
        rand = 0,
        text = "";

    rand = Math.floor( Math.random() * 20 );
    if( 0 <= rand && rand <=9 ) {
        text = valu[1] + rand;
    }else{
        text = valu[1] - rand + 10;
    }
    sck_io.of("/scr/104").emit('scr104_tmplog', text);

    setTimeout( showData, 1000 );
}

/**
 * 作業モニタ画面へデータを送る
 *    タイマでポーリングします
 * @module showData2
 * @param  none
 * @date   16/jul/2012
 */
function showData2() {

    var valu = [999,24,50,0,0,0,0,0,0,0,0],
        rand = 0,
        text = "";

    rand = Math.floor( Math.random() * 90 );
    if( 0 <= rand && rand <=44 ) {
        text = valu[2] + rand;
    }else{
        text = valu[2] - rand + 45;
    }
    sck_io.of("/scr/104").emit('scr104_worklog', text);

    setTimeout( showData2, 400 );
}

/**
 * 作業モニタ デモ/main routine
 * @module mgrmon.main
 * @param  none
 * @date   30/jun/2012
 */
exports.main = function() {

    lcsAp.log('--- MgrMon background process start');

    showData();
    showData2();
};
