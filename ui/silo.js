var us = document.getElementById("username");
var pa = document.getElementById("password");
var s =  document.getElementById("sas");
var sub =  document.getElementById("sub");
sub.onclick = function(){
var name = us.value;
var pass = pa.value;
console.log(name,pass);

        var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE){
        if (request.status === 200){
            var nae_stg = request.responseText;
            alert(nae_stg);
        }
        else if (request.status === 500){
            var nae_1stg = request.responseText;
            alert(nae_1stg);
        }
    }
    };
    request.setRequestHeader("Content-Type", "applicaton/json");
    request.open("POST","http://mithun14leo.imad.hasura-app.io/create-user", true);
    request.send(JSON.stringify({'username':name,'password':pass}));
    };

