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
            s.innerHtml='ACCOUNT CREATED SUCCESSFULLY FOR '+ name;
            //alert('ACCOUNT CREATED SUCCESSFULLY FOR '+ name);
        }
        else if (request.status === 500){
            var nae_1stg = request.responseText;
             s.innerHtml=nae_1stg;
            //alert(nae_1stg);
        }
    }
    };
    
    request.open("POST","http://mithun14leo.imad.hasura-app.io/create-user", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({'username':name,'password':pass}));
    };

