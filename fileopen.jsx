var fileobj=File.openDialog("open", ["text:*.txt"]);

if(fileobj.open("r")){
    var text = fileobj.read();
    fileobj.close();

    var atext = ['null'];
    
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