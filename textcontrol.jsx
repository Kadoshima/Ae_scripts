#include "autoslide.jsx"

textcontrol();

/*
    ファイルが存在するか調べるとともに
    引数の名前のファイルが何個目のアイテムであるかを返す関数*/
function existFolderName(fName){
    
    for(var i = 1; i <= app.project.numItems; i++){
        
        var aItem = app.project.item(i);
        var flag = aItem instanceof FolderItem;
        
        if ((flag == true) && (aItem.name == fName)){
            return i;
        }
    }
    return 0;
}

//fileをオープンし、テキストを分ける
function textopen(){
    var fileobj = File.openDialog("open", ["text:*.txt"]);
    
    if(fileobj == null){
        return;
        }

    if(fileobj.open("r")){
        var text = fileobj.read();
        fileobj.close();

        var atext = ['',''];
        
        var count = 1;
        for(var i = 0; i < text.length; i++){
            if(text[i] == '\n' || text[i] =='\r' || text[i] =='\r\n'){
                count++;
                atext.push("");
                }
            else{
                atext[count] += text[i];
                }
            }
        return atext;
        }
    }

//テキストのコントロール
function textcontrol(){
    
    //変数の宣言
    var textcomp = ['null'];
    var textpaht;
    
    //textファイルがなかった場合のエラー処理
    //imgFolderNumber = プロジェクトの何番目にtextFolderがあるか
    
    if ((textFolderNumber = existFolderName("text")) == false){
        alert("「text」というファイルが見つかりません。");
        return ;
    }

    //textフォルダのアイテム数をQuantityへ代入
    textpaht = app.project.item(textFolderNumber);
    
    //コンポジションを変数compに代入
    for(var i = 1; i <= textpaht.numItems; i++){
        textcomp.push (textpaht.item(i));
    }
    
    //textopen()を使いtextにテキスト入れる
    var text = [];
    text = textopen();
    
    //キャンセルされた場合
    if(text == null){
        alert("キャンセル");
        return ;
        }
    
    //テキストレイヤーの内容を変える
    for(var i=1; i < text.length; i++){
        textcomp[i].layer(1).property("ADBE Text Properties")
        .property("ADBE Text Document").setValue(text[i]);
    }
}

