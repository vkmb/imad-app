var ne = document.getElementById('name');
var st = document.getElementById('submit');
var uol = document.getElementById('ul');
st.onclick = function(){
var name = ne.value;
var req = new XMLHtppRequest();
req.onreadystatechange = function(){
    if (req.readyState === XMLHttpRequest.DONE){
        if (req.status === 200){
            alert(name);
        }
        else if (req.status === 500){
            var nae_1stg = req.responseText;
            alert(nae_1stg);
        }
    }
    };
req.open("GET","http://mithun14leo.imad.hasura-app.io/submitname?name="+name, true);
req.send(null);
};