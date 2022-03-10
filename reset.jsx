#include "autoslide.jsx"

//リセットする
function reset(){
    
    //変数の宣言
    var comp = ['null'];
    var textcomp = ['null'];

    //imgファイルの削除
    for(var i=1; i <= app.project.numItems; i++){
        if ((imgFolderNumber = existFolderName("img")) > 1){
            app.project.item(imgFolderNumber).remove();
            }
        else{
            break;
        }
        }
    
    //textというファイルが何番目にあるか
    var textFolderNumber = existFolderName("text");
            
    //textフォルダのオブジェクトをtextへ代入
    var textobject = app.project.item(textFolderNumber);

//各コンポジションの画像を削除
    for(var i = 1; i <= 16; i++){
            if(app.project.item(i).layer(1).name != "placeholder.jpg"){
                app.project.item(i).layer(1).remove();
                }
            
            //コンポジションを変数compに代入
            textcomp.push (textobject.item(i));
            
            textcomp[i].layer(1).property("ADBE Text Properties")
            .property("ADBE Text Document").setValue("your placeholder name " + i);
         }
     
     }