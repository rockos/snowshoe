
/*Canvas node*/
var cvs = [];
/*Canvas context*/
var ctx = [];
/*Canvas context property"canvas"*/
var cv = [];

var img01 = new Image();
var v01 = new Image();
var v02 = new Image();
var v03 = new Image();
img01.src = "/images/shinbashi.gif"; /*842 x 742*/
v01.src = "/images/car01.gif"; /*40x20*/
v02.src = "/images/car02.gif"; /*40x20*/
v03.src = "/images/car03.gif"; /*40x20*/

var ofs = [0,-40];
var crd = [];
var prev_crd = [];
var MAX_OBJ = 11;

onload = function() {
    cvs[0] = document.getElementById("map001");
    if( cvs[0].getContext ) {
        ctx[0] = cvs[0].getContext("2d");
        canvas_draw(0);
    }
    for( var i=0; i<=MAX_OBJ; i++ ) {
        crd[i] = [-1,-1];
        prev_crd[i] = [-1,-1];
    }
}
/**
 *  描画のための初期設定
 *  canvas_draw()
 *  p : canvasのエリア
 */
var canvas_draw = function(p) {
    ctx[0].drawImage(img01, 
                     0, 0, 840, 740,   /*元画像の範囲指定*/ 
                     ofs[0], ofs[1], 840, 740);  /*描画の指定*/

    /*test用*/
    //obj_draw(0,480,530);
    //setTimeout( function(){
    //    obj_els(0,480,530);
    //},2000 );
}

var obj_draw = function(p,x,y,vNo) {
    ctx[p].drawImage(vNo, 
        0, 0, 40, 20,   /*元画像の範囲指定*/ 
        ofs[0]+x-20, ofs[1]+y-10, 40, 20);  /*描画の指定*/
    /*
    ctx[p].lineWidth = 2;
    ctx[p].beginPath();
    ctx[p].rect(ofs[0]+x,ofs[1]+y,10,10);
    ctx[p].stroke();
    ctx[p].fill();
    */
}
var err_draw = function(p,x,y) {
    ctx[p].fillStyle = "rgb(255,0,0)";
    ctx[p].strokeStyle = "rgb(0,0,0)";
    ctx[p].lineWidth = 2;
    ctx[p].beginPath();
    //ctx[p].rect(ofs[0]+x,ofs[1]+y,10,10);
    ctx[p].rect(ofs[0]+x-20,ofs[1]+y-10,40,20);
    ctx[p].stroke();
    ctx[p].fill();
}
var obj_els = function(p,x,y) {
    ctx[p].drawImage(img01,
        x-2-20,y-2-10,40+4,20+4,   /*元画像の範囲指定*/
        ofs[0]+x-2-20,ofs[1]+y-2-10,40+4,20+4);  /*描画の指定*/


//    ctx[p].drawImage(img01,
//        x-2,y-2,10+4,10+4,   /*元画像の範囲指定*/
//        ofs[0]+x-2,ofs[1]+y-2,10+4,10+4);  /*描画の指定*/
}

var socket = io.connect("/scr/103");

/*
 *  1号機
 */
socket.on("scr103_mapie_1", function (text) { 
    var index = 1;
    //document.getElementById("debug1").innerHTML = text;

    if( ctx[0] ) {                    
        ary = text.split(',');
        crd[index] = new Array( parseInt(ary[0]), parseInt(ary[1]), parseInt(ary[2]) );

        document.getElementById("v01_state_val01").innerHTML = ary[0]+","+ary[1];
        document.getElementById("v01_state_val02").innerHTML = ary[2];
        document.getElementById("v01_state_val03").innerHTML = ary[3];
        document.getElementById("v01_state_val04").innerHTML = ary[4];
        if( crd[index][2] ) {
            document.getElementById("v01_state_val02").parentNode.style.backgroundColor = "red";
            document.getElementById("v01_state_val03").parentNode.style.backgroundColor = "red";
        }else{
            document.getElementById("v01_state_val02").parentNode.style.backgroundColor = "";
            document.getElementById("v01_state_val03").parentNode.style.backgroundColor = "";
        }
        if( ary[4].length ) {
            document.getElementById("v01_state_val04").parentNode.style.backgroundColor = "gold";
        }else{
            document.getElementById("v01_state_val04").parentNode.style.backgroundColor = "";
        }

        if( prev_crd[index][0] > 0 ) {
            obj_els(0,prev_crd[index][0],prev_crd[index][1]);
        }
        if( crd[index][2] > 0 ) {
            err_draw(0,crd[index][0],crd[index][1]);
        }else{
            ctx[0].fillStyle = "rgb(0,0,0)";
            ctx[0].strokeStyle = "rgb(255,255,255)";
            obj_draw(0,crd[index][0],crd[index][1],v01);
        }
        prev_crd[index] = crd[index];
    }
});

/*
 *  2号機
 */
socket.on("scr103_mapie_2", function (text) { 
    var index = 2;
    //document.getElementById("debug2").innerHTML = text;

    if( ctx[0] ) {                    
        ary = text.split(',');
        crd[index] = new Array( parseInt(ary[0]), parseInt(ary[1]), parseInt(ary[2]) );

        document.getElementById("v02_state_val01").innerHTML = ary[0]+","+ary[1];
        document.getElementById("v02_state_val02").innerHTML = ary[2];
        document.getElementById("v02_state_val03").innerHTML = ary[3];
        document.getElementById("v02_state_val04").innerHTML = ary[4];
        if( crd[index][2] ) {
            document.getElementById("v02_state_val02").parentNode.style.backgroundColor = "red";
            document.getElementById("v02_state_val03").parentNode.style.backgroundColor = "red";
        }else{
            document.getElementById("v02_state_val02").parentNode.style.backgroundColor = "";
            document.getElementById("v02_state_val03").parentNode.style.backgroundColor = "";
        }
        if( ary[4].length ) {
            document.getElementById("v02_state_val04").parentNode.style.backgroundColor = "gold";
        }else{
            document.getElementById("v02_state_val04").parentNode.style.backgroundColor = "";
        }

        if( prev_crd[index][0] > 0 ) {
            obj_els(0,prev_crd[index][0],prev_crd[index][1]);
        }
        if( crd[index][2] > 0 ) {
            err_draw(0,crd[index][0],crd[index][1]);
        }else{
            ctx[0].fillStyle = "rgb(0,0,255)";
            ctx[0].strokeStyle = "rgb(255,255,0)";
            obj_draw(0,crd[index][0],crd[index][1],v02);
        }
        prev_crd[index] = crd[index];
    }
});

/*
 *  3号機
 */
socket.on("scr103_mapie_3", function (text) { 
    var index = 3;
    //document.getElementById("debug3").innerHTML = text;

    if( ctx[0] ) {                    
        ary = text.split(',');
        crd[index] = new Array( parseInt(ary[0]), parseInt(ary[1]), parseInt(ary[2]) );

        document.getElementById("v03_state_val01").innerHTML = ary[0]+","+ary[1];
        document.getElementById("v03_state_val02").innerHTML = ary[2];
        document.getElementById("v03_state_val03").innerHTML = ary[3];
        document.getElementById("v03_state_val04").innerHTML = ary[4];
        if( crd[index][2] ) {
            document.getElementById("v03_state_val02").parentNode.style.backgroundColor = "red";
            document.getElementById("v03_state_val03").parentNode.style.backgroundColor = "red";
        }else{
            document.getElementById("v03_state_val02").parentNode.style.backgroundColor = "";
            document.getElementById("v03_state_val03").parentNode.style.backgroundColor = "";
        }
        if( ary[4].length ) {
            document.getElementById("v03_state_val04").parentNode.style.backgroundColor = "gold";
        }else{
            document.getElementById("v03_state_val04").parentNode.style.backgroundColor = "";
        }

        if( prev_crd[index][0] > 0 ) {
            obj_els(0,prev_crd[index][0],prev_crd[index][1]);
        }
        if( crd[index][2] > 0 ) {
            err_draw(0,crd[index][0],crd[index][1]);
        }else{
            ctx[0].fillStyle = "rgb(0,255,0)";
            ctx[0].strokeStyle = "rgb(255,0,255)";
            obj_draw(0,crd[index][0],crd[index][1],v03);
        }
        prev_crd[index] = crd[index];
    }
});

/*
 *  4号機
 */
socket.on("scr103_mapie_4", function (text) { 
    var index = 4;
    document.getElementById("debug4").innerHTML = text;

    if( ctx[0] ) {                    
        ary = text.split(',');
        crd[index] = new Array( parseInt(ary[0]), parseInt(ary[1]), parseInt(ary[2]) );
        if( prev_crd[index][0] > 0 ) {
            obj_els(0,prev_crd[index][0],prev_crd[index][1]);
        }
        if( crd[index][2] > 0 ) {
            err_draw(0,crd[index][0],crd[index][1]);
        }else{
            ctx[0].fillStyle = "rgb(0,0,255)";
            ctx[0].strokeStyle = "rgb(255,255,0)";
            obj_draw(0,crd[index][0],crd[index][1]);
        }
        prev_crd[index] = crd[index];
    }
});

/*
 *  5号機
 */
socket.on("scr103_mapie_5", function (text) { 
    var index = 5;
    document.getElementById("debug5").innerHTML = text;

    if( ctx[0] ) {                    
        ary = text.split(',');
        crd[index] = new Array( parseInt(ary[0]), parseInt(ary[1]), parseInt(ary[2]) );
        if( prev_crd[index][0] > 0 ) {
            obj_els(0,prev_crd[index][0],prev_crd[index][1]);
        }
        if( crd[index][2] > 0 ) {
            err_draw(0,crd[index][0],crd[index][1]);
        }else{
            ctx[0].fillStyle = "rgb(0,0,255)";
            ctx[0].strokeStyle = "rgb(255,255,0)";
            obj_draw(0,crd[index][0],crd[index][1]);
        }
        prev_crd[index] = crd[index];
    }
});

/*
 *  6号機
 */
socket.on("scr103_mapie_6", function (text) { 
    var index = 6;
    document.getElementById("debug6").innerHTML = text;

    if( ctx[0] ) {                    
        ary = text.split(',');
        crd[index] = new Array( parseInt(ary[0]), parseInt(ary[1]), parseInt(ary[2]) );
        if( prev_crd[index][0] > 0 ) {
            obj_els(0,prev_crd[index][0],prev_crd[index][1]);
        }
        if( crd[index][2] > 0 ) {
            err_draw(0,crd[index][0],crd[index][1]);
        }else{
            ctx[0].fillStyle = "rgb(0,0,255)";
            ctx[0].strokeStyle = "rgb(255,255,0)";
            obj_draw(0,crd[index][0],crd[index][1]);
        }
        prev_crd[index] = crd[index];
    }
});

/*
 *  7号機
 */
socket.on("scr103_mapie_7", function (text) { 
    var index = 7;
    document.getElementById("debug7").innerHTML = text;

    if( ctx[0] ) {                    
        ary = text.split(',');
        crd[index] = new Array( parseInt(ary[0]), parseInt(ary[1]), parseInt(ary[2]) );
        if( prev_crd[index][0] > 0 ) {
            obj_els(0,prev_crd[index][0],prev_crd[index][1]);
        }
        if( crd[index][2] > 0 ) {
            err_draw(0,crd[index][0],crd[index][1]);
        }else{
            ctx[0].fillStyle = "rgb(0,0,255)";
            ctx[0].strokeStyle = "rgb(255,255,0)";
            obj_draw(0,crd[index][0],crd[index][1]);
        }
        prev_crd[index] = crd[index];
    }
});

/*
 *  8号機
 */
socket.on("scr103_mapie_8", function (text) { 
    var index = 8;
    document.getElementById("debug8").innerHTML = text;

    if( ctx[0] ) {                    
        ary = text.split(',');
        crd[index] = new Array( parseInt(ary[0]), parseInt(ary[1]), parseInt(ary[2]) );
        if( prev_crd[index][0] > 0 ) {
            obj_els(0,prev_crd[index][0],prev_crd[index][1]);
        }
        if( crd[index][2] > 0 ) {
            err_draw(0,crd[index][0],crd[index][1]);
        }else{
            ctx[0].fillStyle = "rgb(0,0,255)";
            ctx[0].strokeStyle = "rgb(255,255,0)";
            obj_draw(0,crd[index][0],crd[index][1]);
        }
        prev_crd[index] = crd[index];
    }
});

/*
 *  9号機
 */
socket.on("scr103_mapie_9", function (text) { 
    var index = 9;
    document.getElementById("debug9").innerHTML = text;

    if( ctx[0] ) {                    
        ary = text.split(',');
        crd[index] = new Array( parseInt(ary[0]), parseInt(ary[1]), parseInt(ary[2]) );
        if( prev_crd[index][0] > 0 ) {
            obj_els(0,prev_crd[index][0],prev_crd[index][1]);
        }
        if( crd[index][2] > 0 ) {
            err_draw(0,crd[index][0],crd[index][1]);
        }else{
            ctx[0].fillStyle = "rgb(0,0,255)";
            ctx[0].strokeStyle = "rgb(255,255,0)";
            obj_draw(0,crd[index][0],crd[index][1]);
        }
        prev_crd[index] = crd[index];
    }
});

/*
 *  10号機
 */
socket.on("scr103_mapie_10", function (text) { 
    var index = 10;
    document.getElementById("debug10").innerHTML = text;

    if( ctx[0] ) {                    
        ary = text.split(',');
        crd[index] = new Array( parseInt(ary[0]), parseInt(ary[1]), parseInt(ary[2]) );
        if( prev_crd[index][0] > 0 ) {
            obj_els(0,prev_crd[index][0],prev_crd[index][1]);
        }
        if( crd[index][2] > 0 ) {
            err_draw(0,crd[index][0],crd[index][1]);
        }else{
            ctx[0].fillStyle = "rgb(0,0,255)";
            ctx[0].strokeStyle = "rgb(255,255,0)";
            obj_draw(0,crd[index][0],crd[index][1]);
        }
        prev_crd[index] = crd[index];
    }
});

