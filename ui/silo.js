console.log('Loaded!');
var us = document.getElementById('username');
var pa = document.getElementById('password');
var sub =  document.getElementById('sub');
sub.onClick = function(){
    console.log(us.value.toString() +"  "+ pa.value.toString() );
}; 
