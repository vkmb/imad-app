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
    setInterval(move_to_right, 50)
};
t.onclick = function(){
    t.innerHtml = "You have opened the secret tunnel !!"
};
