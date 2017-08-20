console.log('Loaded!');

// move the img
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
var button = document.getElementById("b");
var count = 0;
var ctext = document.getElementById("spa1");
b.onclick = function(){
    var request = new XMLHttpRequest();
    if (request.readyState === XMLHttpRequest.done){
        if (request.status === 200){
            var count = request.responseText;
            ctext.innerHTML = count.toString();
        }
        
    }
}
reponse.open("GET","http://mithun14leo.imad.hasura-app.io", true)
reponse.send()