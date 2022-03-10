#include "autoslide.jsx"
#include "reset.jsx"
#include "encode.jsx"

//　ダイアログ作成
var  objDlg = new Window ("palette", "AUTO", [0,0,200,330]);

//　タブパネルを追加
var objTbPnl = objDlg.add("tabbedpanel", [20,20,190,300]);

//タブパネルにタブを2つ追加
var objTb01 = objTbPnl.add("tab", undefined, "スライド");
var objTb02 = objTbPnl.add("tab", undefined, "ツリー");

//各タブにアイテムを挿入
var SldAll = objTb01.add("button", [20, 0, 80, 120], "一括変更");
var Imgchg = objTb01.add("button", [90, 0, 150, 50], "画像のみ");
var Textchg = objTb01.add("button", [90, 70, 150, 120], "テキストのみ");
var Encode = objTb01.add("button", [20, 130, 150, 160], "エンコード");
var Reset= objTb01.add("button", [20, 170, 150, 200], "リセット");


SldAll.onClick = function(){
    if(imgfilemaker() == 1){
        return;
        }
    if(insert() == 1){
        return;
        }
    if(SizeControl() == 1){
        return;
        }
    if(textcontrol() == 1){
        return;
        }
}

Imgchg.onClick = function(){
    if(imgfilemaker() == 1){
        return;
        }
    if(insert() == 1){
        return;
        }
    if(SizeControl() == 1){
        return;
        }
}

Textchg.onClick = function(){
    textcontrol();
}

Encode.onClick = function(){
    encode();
}

Reset.onClick = function(){
    try{
        reset();
        alert("リセットしました");
        }
    catch(Error){
        alert("リセットに失敗しました");
        }
}

//　ダイアログを画面センターに表示
objDlg.center();
objDlg.show();