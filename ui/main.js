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

var button = document.getElementById('b');
var count = 0;
button.onclick = function(){
    count = count+1;
    var cote = document.getElementById('s');
    cote.innerHTML = count.toString();
}; 
*/
var button = document.getElementById('b');
button.onclick = function(){
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
var name_list = [];
var sub_button = document.getElementById("submit");
var name_text = document.getElementById("name");
sub_button.onclick= function(){
    var name = name_text.value;
        var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE){
        if (request.status === 200){
            var count = request.responseText;
        }
        
    }
        
    };
    request.open("GET","http://mithun14leo.imad.hasura-app.io/submit-name/"+name, true);
    request.send(null);
    };