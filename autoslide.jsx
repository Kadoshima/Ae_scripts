/* ファイルが存在するか調べるとともに
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
/*
    imgフォルダの中にあるアイテムを変数に入れて返す*/
function InfolderItems(imgFolderNumber){
    
    var img = ['null'];
    var aFolder = app.project.item(imgFolderNumber);

    for(var i = 1; i <= aFolder.numItems; i++){
        img.push (aFolder.item(i));
    }

    return img;
}
/*
    textフォルダの中にあるコンポジションを変数に入れて返す*/
function Infoldercomps(imgFolderNumber){
    
    var textcomp = ['null'];
    var aFolder = app.project.item(imgFolderNumber);

    for(var i = 1; i <= aFolder.numItems; i++){
        textcomp.push (aFolder.item(i));
    }
    return textcomp;
}
/*
    プロジェクトの中にあるコンポジションに
    画像を挿入する*/
function insert(){
    
    //変数の宣言
    var comp = ['null'];
    var img;
    var Quantity;
    
    //imgファイルがなかった場合のエラー処理
    if ((imgFolderNumber = existFolderName ("img")) == false){
        
        alert("「img」というファイルが見つかりません。");
        return 1;
        }
    
    //img変数に画像オブジェクトを代入
    img = InfolderItems (imgFolderNumber);
    //imgフォルダのパスをimgpahtへ代入
    imgpaht = app.project.item(imgFolderNumber);
    
    //コンポジションを変数compに代入
    for(var i = 1; i <= imgpaht.numItems; i++){
            comp.push (app.project.item(i));
         }
     
     for(var i = 1; i <= imgpaht.numItems; i++){
            comp[i].layers.add(img[i]);
         }
}


//以下調節
function SizeControl(){
    
    //変数の宣言
    var comp = ['null'];
    var Quantity;
    
    //imgファイルがなかった場合のエラー処理
    if ((imgFolderNumber = existFolderName ("img")) == false){
        alert("「img」というファイルが見つかりません。");
        return 1;
        }
    
    //imgフォルダのアイテム数をQuantityへ代入
    Quantity = app.project.item(imgFolderNumber);
    
    //コンポジションを変数compに代入
    for(var i = 1; i <= Quantity.numItems; i++){
            comp.push (app.project.item(i));
         }
    
    //コンポジションを変数compに代入
    for(var i = 1; i <= Quantity.numItems; i++){
            var lay = comp[i].layer(1);
            if(lay.width > lay.height){
                
                 //比率の計算
                var magnification = ((comp[i].width/lay.width)*100)+2;
                
                //設定
                lay.property("ADBE Transform Group")
                .property("ADBE Scale")
                .setValue([magnification, magnification, magnification]);
                
                }
            else {
                
                //比率の計算
                var magnification = ((comp[i].height/lay.height)*100)+5;
                
                //設定
                lay.property("ADBE Transform Group")
                .property("ADBE Scale")
                .setValue([magnification, magnification, magnification]);
                
                //縦長写真の背景設定（画像のコピー）
                comp[i].layer(1).copyToComp(comp[i]);
                
                //縦長写真の背景設定（2枚目のサイズ設定）
                magnification = ((comp[i].width/lay.width)*100)+2;
                comp[i].layer(2)
                .property("ADBE Transform Group")
                .property("ADBE Scale")
                .setValue([magnification, magnification, magnification]);
                
                //縦長写真の背景設定（2枚目のエフェクト設定）
                lay.property("ADBE Effect Parade").addProperty("ADBE PhotoFilterPS");
                //変数にレンズフィルターのプロパティのパスを代入して、フィルターの種類と濃度を設定
                var PhotoFilter = lay.property("エフェクト")("レンズフィルター");
                PhotoFilter.property("フィルター").setValue(2);
                PhotoFilter.property("濃度").setValue(50);
                }
         }
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
        return 1;
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
        return 1;
        }
    
    //テキストレイヤーの内容を変える
    for(var i=1; i < text.length; i++){
        textcomp[i].layer(1).property("ADBE Text Properties")
        .property("ADBE Text Document").setValue(text[i]);
    }
}


//imgファイルを作成する
function imgfilemaker(){
    var imp = new ImportOptions();
    var fObj;
        
    if((fObj= Folder.selectDialog('フォルダを選択'))== null){
        alert("キャンセルされました");
        return 1;
        }
    var folder = app.project.items.addFolder("img");
    var fileList = fObj.getFiles('*.jpg' || '*.JPG' || '*.jpeg' || '*.png' || '*.PNG');
    
    if(fileList == null){
        alert("imgファイルが空です");
        return 1;
        }
    
    for (var i=0; i<fileList.length; i++){
        imp.file = new File(fileList[i]);
        imp.importa = false;
        var imgpearent = app.project.importFile(imp);
        imgpearent.parentFolder = folder;
        }    
}


