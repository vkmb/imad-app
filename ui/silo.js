console.log('Loaded!');
var us = document.getElementById('username');
var pa = document.getElementById('password');
var sub =  document.getElementById('sub');
sub.onClick = function(){
var name = name_text.value;
        var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE){
        if (request.status === 200){
            var nae_stg = request.responseText;
    
        }
        
    }
        
    };
    request.open("GET","http://mithun14leo.imad.hasura-app.io/account", true);
    request.send(null);
    };
}; 
