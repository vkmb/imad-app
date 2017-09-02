var name_list = [];

var sub_button = document.getElementById("submit");
var name_text = document.getElementById("name");
var ul = document.getElementById("ul");
sub_button.onclick= function(){
    var name = name_text.value;
        var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE){
        if (request.status === 200){
            var name1 = "";
            var nae_stg = request.responseText;
            ul.innerHTML = nae_stg;
        }
        else if (request.status === 502){
            var nae_stg1 = request.responseText;
            ul.innerHTML = name1;
        }
    
        
    }
        
    };
    request.open("GET","http://mithun14leo.imad.hasura-app.io/dummy2?name="+name, true);
    request.send(null);
    };