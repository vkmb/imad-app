var us = document.getElementById("username");
var pa = document.getElementById("password");
var s =  document.getElementById("sas");
var sub =  document.getElementById("sub");
var log = document.getElementById("login");
sub.onclick = function(){
var name = us.value;
var pass = pa.value;
console.log(name);
console.log(pass);
        var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE){
        if (request.status === 200){
            s.innerHTML=['ACCOUNT CREATED SUCCESSFULLY FOR ',name].join(" ");
            //alert('ACCOUNT CREATED SUCCESSFULLY FOR '+ name);
        }
        else if (request.status === 500){
            var nae_1stg = request.responseText;
             s.innerHTML=nae_1stg.toString();
            //alert(nae_1stg);
        }
    }
    };
    
    request.open("POST","http://mithun14leo.imad.hasura-app.io/create-user", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({'username':name,'password':pass}));
    };

log.onclick = function(){
var name = us.value;
var pass = pa.value;
console.log(name);
console.log(pass);
        var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE){
        if (request.status === 200){
            var a = request.responseText;
            alert(a.toString());
        }
        else if (request.status === 500){
            var nae_1stg = request.responseText;
             s.innerHTML=nae_1stg.toString();
            //alert(nae_1stg);
        }
        else if (request.status === 403){
            var naes_1stg = request.responseText;
             s.innerHTML=naes_1stg.toString();
            //alert(nae_1stg);
        }
    }
    };
    
    request.open("POST","http://mithun14leo.imad.hasura-app.io/create-user", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({'username':name,'password':pass}));
    };
