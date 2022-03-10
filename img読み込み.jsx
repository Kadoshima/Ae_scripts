//imgファイルを作成する

imgfilemaker();

function imgfilemaker(){
    var imp = new ImportOptions();
    var fObj;
        
    if((fObj= Folder.selectDialog('フォルダを選択'))== null){
        alert("キャンセルされました");
        return 1;
        }
    
    var fileList = fObj.getFiles("*.jpg" && "*.JPG" && "*.jpeg" && "*.png" && "*.PNG");
    
    if(fileList < 1){
        alert("imgファイルが空です");
        return 1;
        }
    alert(fileList.length);
    
    var folder = app.project.items.addFolder("img");
    
    for (var i=0; i<fileList.length; i++){
        alert("fileList" + i);
        imp.file = new File(fileList[i]);
        imp.importa = false;
        var imgpearent = app.project.importFile(imp);
        imgpearent.parentFolder = folder;
        }    
}
