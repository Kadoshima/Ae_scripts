//windowの作成
var win = new Window ("palette", "選択");
//Itemを横並びに
win.orientation = "row";
//部品の追加
var text = win.add ("statictext", undefined, "レンダリングキューにアイテムが複数個存在します。\n削除しても良い場合はチェックを入れて実行を押してください。\nチェックしなかった場合、全てがレンダリングされます。", {multiline:true});
var cb = win.add("checkbox", undefined, "削除");
var btn = win.add("button", undefined, "実行");

win.show();