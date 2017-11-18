var port = 80;
var name_list =[]
var count = 0;
var config  = {
    user:'mithun14leo',
    database : 'mithun14leo',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password : process.env.DB_PASSWORD
};

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bp = require('body-parser');
var app = express();
var pool = new Pool(config);
var map1 = null;
var bat_value = null;
var sensor_value = null;
//

app.use(morgan('combined'));
app.use(bp.json());

// logical
function hash(value,salt){
    var return_value = crypto.pbkdf2Sync(value, salt, 10000, 512, 'sha512');
    return ['pbkdf','10000', salt, return_value.toString('hex')].join('$');
}


/*
function convert2html(data){
    var title = data.title;
    var head = data.heading;
    var date = data.date;
    var content = data.content;
    var html_template = `
    <html>
    <head>
        <title>${title}</title>
        <link href="/ui/style.css" rel=stylesheet>
        <meta name="viewport" content="width: device-width, initial-scale:1">
    
    </head>
    <body>
        <div>
            <a href="/">Home</a>
        </div>
        <div class="content">
            <div>
                <h2>
                   ${head}<br>
                   <hr/>
                   ${date.toDateString()}
                </h2>
                ${content}
            </div>
        </div>
    </body>
    
</html>
    `;
    return html_template;
}
*/

//end pionts
function mylocmap(la,lo){
    var lat = la;
    var lon = lo;
    map1 =`<!DOCTYPE html>
<html>
  <head>
    <title>KayBee</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: ${lat}, lng: ${lon}},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Kaybee is here.' :
                              'Error: Your browser doesnot support geolocation.');
        infoWindow.open(map);
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGaEu22Va5yqsYOX_yRQKTrtUyrnorq4w&callback=initMap">
    </script>
  </body>
</html>
`;
}

app.post ('/battery',function(req,res){
    var value = req.body.battery;
    bat_value = value;
    res.send(200);
});
app.get('/batsts',function(req, res){
    if (bat_value !== null)
    {
    res.send(bat_value.toString());}
    else{
        res.send("Status Not Updated");
    }
});

app.post ('/location',function(req,res){
    var lat = req.body.lat;
    var lon = req.body.lon;
    mylocmap(lat,lon);
    res.send(200);
});
app.get('/kaybee',function(req, res){
    if (map1 !== null)
    {
    res.send(map1.toString());}
    else{
        res.send("Status Not Updated");
    }
});

app.post('/sense', function(req, res){
    var data = parseInt(req.body.sd);
    pool.query('INSERT INTO sensed_data (data) VALUES ($1)', [data], function(err, result){
        if (err){
            var err4 = JSON.stringify({'error':err.toString()});
            res.send(500).send(err4);
        }
        else{
            var suc = JSON.stringify({'Message': 'Data Uploaded '});
            res.send(suc);
        }
    });
});


app.get('/sen_data',function(req, res){
    pool.query('SELECT data FROM sensed_data',function(err, result){
       if (err){
           var error = err.toString();
           res.send(500).send(error);
       }
       else {
            res.send(JSON.stringify(result.rows));
           
}
           
    });
});

app.post('/create-user',function(req,res){
    var usna = req.body.username;
    var pass = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var passq = hash(pass, salt);
    pool.query('INSERT INTO all_db (usna, pass) VALUES ($1, $2)', [usna, passq], function(err, result){
        if (err){
            var err4 = JSON.Stringify({'error':err.toString()});
            res.send(500).send(err4);
        }
        else{
            var suc = JSON.stringify({'message': 'Account Successfully created for '+usna});
            res.send(suc);
        }
    });
});

app.post('/login', function(req, res){
    var sent_name = req.body.username;
    var sent_pass = req.body.password;
    pool.query('SELECT * FROM all_db WHERE usna = $1',[sent_name],function(err, result){
       if (err){
           var error = err.toString();
           res.send(500).send(error);
       }
       else {
           if(result.rows.length === 0){
               var error2 = JSON.stringify({"error":'Account does not exsist'});
               res.send(403).send(error2);
       }
       else {
           var dbs = result.rows[0].pass;
           var sal = dbs.split('$')[2];
           var has_pas = hash(sent_pass, sal);
           if (has_pas === dbs){
               var outp = JSON.stringify({"messsage":"Logged in successfully"});
               res.send(outp);
           }
           else {
                var error3 = JSON.stringify({"error": 'Incorrect Password'});
               res.send(403).write(error3);
           }
       }
           
       }
    });
    
});


/*app.get('/hash/:value',function(req,res){
    var value = req.params.value;
    value = hash(value,'hello');
    res.send(value);
});*/
/*app.get('/submit-name/:nameid', function (req, res) {
  var name = req.params.nameid;
  name_list.push(name);
  res.send(JSON.stringify(name_list));
});*/
/*app.get('/submit-name', function (req, res) {
  var name = req.qurey.nameid;
  name_list.push(name);
  res.send(JSON.stringify(name_list));
});*/

app.get('/articles/:articletitle', function (req, res) {
    pool.query("SELECT * FROM article WHERE title =  $1",[req.params.articletitle], function(err, result){
       if (err){
           res.status(500).send(err.toString());}
       else {
           if (result.rows.length === 0)
               {res.send('Article Not found');}
          
           else {
               var articledata = result.rows[0];
               res.send(convert2html(articledata));
           }
       }
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/my',function(req, res){
  res.sendFile(path.join(__dirname,'ui','my.html'));
});
app.get('/counter',function(req, res){
 count = count + 1;
 res.send(count.toString());
});
app.get('/submitname', function (req, res) {
  var name = req.query.name;
  name_list.push(name);
  res.send(JSON.stringify(name_list));
});

app.get('/dummy2', function (req, res) {
  var name = req.query.name;
  pool.query("SELECT * FROM dummy WHERE title !=  $1",[name], function(err, result){
       if (err){
           res.status(500).send(err.toString());}
       else {
           if (result.rows.length === 0)
               {res.send('Article Not found');}
          
           else {
               var articledata = result.rows;
               res.send(JSON.stringify(articledata));
           }
       }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/a4img.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'a4img.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/silo.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'silo.js'));
});
app.get('/signup_login', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'silo.html'));
});
app.get('/ui/dummy.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'dummy.html'));
});
app.get('/ui/dummy.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'dummy.js'));
});
app.get('/sen', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'sen_dat.html'));
});
app.get('/ui/list.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'list.js'));
});

app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});