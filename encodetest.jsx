//fullという名前のコンポジションをcomp変数に入れる
var comp;
var pjt = app.project;

//レンダリングキューにアイテムが入っている場合に
//削除するか全てレンダリングするか

if(pjt.renderQueue.numItems >= 1){
    
    //windowの作成
    var win = new Window ("palette", "選択");
    //Itemを横並びに
    win.orientation = "row";
    //部品の追加
    var text = win.add ("statictext", undefined, "レンダリングキューにアイテムが複数個存在します。\n削除しても良い場合はチェックを入れて実行を押してください。\nチェックしなかった場合、全てがレンダリングされます。", {multiline:true});
    var cb = win.add("checkbox", undefined, "削除");
    var btn = win.add("button", undefined, "実行");
    win.show();

    btn.onClick = function(){

        if(cb.value == true){
            //レンダリングキューに入っている項目を全て削除する
            alert(pjt.renderQueue.numItems);
            for (var i = pjt.renderQueue.numItems; i > 0; i--){
                pjt.renderQueue.item(i).remove();
            }
        }

        //待機
        app.scheduleTask('$.writeln(new Data())', 1000, true);

        rendering();
        win.close();
    }
}

else rendering();

function rendering(){
    //fullを探す
    try{
        for (var i = 1; i <= pjt.numItems; i++){
            item = pjt.item(i);
            if(item instanceof CompItem && item.name == "full"){
                comp = item;
                break;
            }
        }
    }
    catch(Error){
        alert("fullという名前のコンポジションがありません");
    }

    //レンダリングキューにcompを入れる
    pjt.renderQueue.items.add(comp);

    //コンポジションの１番上のアイテム名を生い立ちスライドに変更
    try{
        var savefile = new File (pjt.file.path + "/生い立ちスライド" + pjt.renderQueue.numItems + ".mov");
        pjt.renderQueue.item(pjt.renderQueue.numItems).outputModule(1).file = savefile;
        app.project.renderQueue.render(app.project.renderQueue.numItems);
        alert("レンダリングが完了しました");
    }
    catch(Error){
        alert("レンダリングに失敗しました");
    }
}