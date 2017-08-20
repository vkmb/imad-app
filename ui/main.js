console.log('Loaded!');

// move the img
/*
var im = document.getElementById("a4img");
var t = document.getElementById("te");
var l=0;

function move_to_right()
{
l = l+1;
im.style.marginLeft = l+'px';
}

im.onclick = function(){
    t.innerHTML = "You have opened the secret tunnel !!";
    setInterval(move_to_right, 50);
};

// index.html
*/

var button = document.getElementById('b');
b.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE){
        if (request.status === 200){
            var count = request.responseText;
            var ctext = document.getElementById('s');
            ctext.innerHTML = count.toString();
        }
        
    }
        
    };
    request.open("GET","http://mithun14leo.imad.hasura-app.io/counter", true);
    request.send(null);
};
