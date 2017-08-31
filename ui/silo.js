console.log('Loaded!');
var us = document.getElementById('username');
var pa = document.getElementById('password');
var sub =  document.getElementById('sub');
sub.onClick = function(){
var name = us.value;
var pass = pa.value;
        var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE){
        if (request.status === 200){
            var nae_stg = request.responseText;
            alert(nae_stg);
        }
        else{
            var nae_1stg = request.responseText;
            alert(nae_1stg);
        }
    }
    };
    request.open("GET","http://mithun14leo.imad.hasura-app.io/create-user", true);
    request.setRequestHeader("Content-Type", "applicaton/json");
    request.send(JSON.stringify({'username':name,'password':pass}));
    };

