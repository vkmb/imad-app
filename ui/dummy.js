var ne = document.getElementById('name');
var st = document.getElementById('submit');
var uol = document.getElementById('ul');
st.onclick = function(){
var name = ne.value;
var req = new XMLHtppRequest();
req.onreadystatechange = function(){
    if (req.readyState === XMLHttpRequest.DONE){
        if (req.status === 200){
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
req.open("GET","http://mithun14leo.imad.hasura-app.io/dummy?name="+name, true);
req.send(null);
};