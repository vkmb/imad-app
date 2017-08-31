console.log('Loaded!');
var us = document.getElementById('username');
var pa = document.getElementById('password');
var sub =  document.getElementById('sub');
sub.onClick = function(){
    console.log(us.value.toString() +"  "+ pa.value.toString());
    var request = new XMLHttpRequest();
    request.onreadysatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                alert("Thank you!!!")
            }
            else {
                
            }
            
        }
    }
    request.setRequestHeader('Content-Text', 'application/json');
    request.open("POST","http://mithun14leo.imad.hasura-app.io/account", true);
    request.send(JSON.stringify({'username':us.value, 'password':pa.value}));
}; 
