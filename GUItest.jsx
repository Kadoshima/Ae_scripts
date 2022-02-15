#include "autoslide.jsx"

//　ダイアログ作成
var  objDlg = new Window ("dialog", "タブ", [0,0,200,250]);

//　タブパネルを追加
var objTbPnl = objDlg.add("tabbedpanel", [20,20,180,230]);

//タブパネルにタブを2つ追加
var objTb01 = objTbPnl.add("tab", undefined, "スライド");
var objTb02 = objTbPnl.add("tab", undefined, "ツリー");

//各タブにアイテムを挿入
var SldAll = objTb01.add("button", [20, 0, 80, 120], "一括変更");
var Imgchg = objTb01.add("button", [90, 0, 150, 50], "画像のみ");
var Textchg = objTb01.add("button", [90, 70, 150, 120], "テキストのみ");

//　ダイアログを画面センターに表示
objDlg.center();
objDlg.show();

SldAll.onClick = function(){
    insert();
    SizeControl();
    textcontrol();
}

Imgchg.onClick = function(){
    insert();
    SizeControl();
}

Textchg.onClick = function(){
    textcontrol();
}