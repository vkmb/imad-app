console.log('Loaded!');
var us = document.getElementById('username');
var pa = document.getElementById('password');
var sub =  document.getElementById('sub');
sub.onClick = function(){
    console.log(us.value.toString() +"  "+ pa.value.toString());
    request.setRequestHeader('Content-Text', 'application/json');
    request.open("POST","http://mithun14leo.imad.hasura-app.io/account", true);
    request.send(JSON.stringify({'username':us.value, 'password':pa.value}));
}; 
