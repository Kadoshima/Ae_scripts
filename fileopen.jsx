main();

function imgfilemaker(){
    var imp = new ImportOptions();
    var fObj;
    var folder = app.project.items.addFolder("img");
        
    if((fObj= Folder.selectDialog('フォルダを選択'))== null){
        alert("キャンセルされました");
        return;
        }

    var fileList = fObj.getFiles("*.jpg","*.JPG","*.jpeg","*.png");
    
    for (var i=0; i<fileList.length; i++){
        imp.file = new File(fileList[i]);
        imp.importa = false;
        var imgpearent = app.project.importFile(imp);
        imgpearent.parentFolder = folder;
        }    
}