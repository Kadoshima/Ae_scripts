// ボタン を 追加 する。 
var myWin = new Window("palette", "title"); 
var btn = myWin. add("button", undefined, "Hello"); 
btn. onClick = function(){ 
    alert(" Hello world!"); 
    } 
myWin. show();