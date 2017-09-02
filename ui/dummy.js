var ne = document.getElementById('name');
var st = document.getElementById('submit');
var uol = document.getElementById('ul');
st.onclick = function(){
var name = ne.value;
var req = new XMLHttpRequest();
req.onreadystatechange = function(){
    if (req.readyState === XMLHttpRequest.DONE){
        if (req.status === 200){
            var nae_stg = req.responseText;
            ul.innerHTML = nae_stg;
        }
    }
    };
req.open("GET","http://mithun14leo.imad.hasura-app.io/dummy?name="+name, true);
req.send(null);
};