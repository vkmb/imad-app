var us = document.getElementById("username");
var pa = document.getElementById("password");
var s =  document.getElementById("sas");
var sub =  document.getElementById("sub");
var log = document.getElementById("log");
sub.onclick = function(){
var name = us.value;
var pass = pa.value;
console.log(name);
console.log(pass);
        var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE){
        if (request.status === 200){
            //s.innerHTML=['ACCOUNT CREATED SUCCESSFULLY FOR ',name].join(" ");
            alert('ACCOUNT CREATED SUCCESSFULLY FOR '+ name);
        }
        else if (request.status === 500){
            var nae_1stg = request.responseText;
             //s.innerHTML=nae_1stg.toString();
            alert(nae_1stg);
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
var request = new XMLHttpRequest();
request.onreadystatechange = function(){
if (request.readyState === XMLHttpRequest.DONE){
    if (request.status === 200){
    var a = JSON.parse(request.responseText);
    alert("WELCOME "+a['usna']);
    }
    else if (400 <= request.status <= 505){
        var err_1 = request.responseText;
         s.innerHTML=err_1;
        //alert(nae_1stg);
    }
    }
    };
    
    request.open("POST","http://mithun14leo.imad.hasura-app.io/login", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({'username':name,'password':pass}));
    };
