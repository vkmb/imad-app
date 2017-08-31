console.log('Loaded!');
var us = document.getElementById('username');
var pa = document.getElementById('password');
var sub =  document.getElementById('sub');
sub.onClick = function(){
    console.log(us.value.toString() +"  "+ pa.value.toString());
    var name = us.value;
    var pass = pa.value;
    var request = new XMLHttpRequest();
    request.onreadysatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                alert("Thank you!!!")
            }
        }
    }
    request.setRequestHeader('Content-Type', 'application/json');
    request.open("POST","http://mithun14leo.imad.hasura-app.io/account", true);
    request.send(JSON.stringify({'username':name, 'password':pass}));
}; 
