main();

function main(){
    var imp = new ImportOptions();
    var fObj;
    var img = ['null'];
        
    if((fObj= Folder.selectDialog('フォルダを選択'))== null){
        alert("キャンセルされました");
        return;
        }

    var fileList = fObj.getFiles("*.jpg","*.JPG","*.jpeg","*.png");
    
    imp.file = new File(fileList[0]);
    imp.importa = false;
    var sece = app.project.importFile(imp);
    
    //alert(img[3].fileName);
    
    /*
     for(var i = 1; i <= fileList.length; i++){
            comp[i].layers.add(img[i]);
         }
         */
}