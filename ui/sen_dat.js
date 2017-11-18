
var name_list = [];

var sub_button = document.getElementById("submit");
var ul = document.getElementById("ul");
sub_button.onclick= function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE){
        if (request.status === 200){
            var name1 = "";
            var nae_stg = request.responseText;
            name_list = JSON.parse(nae_stg);
            for (var i =0;i < name_list.length;i++){
                name1 = name1 + "<li>" + name_list[i]+"</li>";
            }
            ul.innerHTML = name1;
        }
        
    }
        
    };
    request.open("GET","http://mithun14leo.imad.hasura-app.io/sen_data");
    request.send(null);
    };