main();

function main(){
    var imp = new ImportOptions();
    var fObj;
    if((fObj= Folder.selectDialog('フォルダを選択'))== null){
        alert("キャンセルされました");
        return;
        }

    var fileList = fObj.getFiles("*.jpg","*.JPG","*.jpeg","*.png");
    alert(fileList.length);
    for(var i = 0; i < fileList.length; i++){
        
        }
}