var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var count = 0; 
var app = express();
var crypto = require('crypto');
app.use(morgan('combined'));
var name_list =[]

var config  = {
    user:'mithun14leo',
    database : 'mithun14leo',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password : process.env.DB_PASSWORD
}
function hash(value,salt){
    var return_value = crypto.pbkdf2Sync(value, salt, 100, 512, 'sha512');
    return return_value.toString('hex');
}
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
var pool = new Pool(config);
app.get('/hash/:value',function(req,res){
    var value = req.params.value;
    res.send(value);
});

app.get('/articles/:articletitle', function (req, res) {
    pool.query("SELECT * FROM article WHERE title =  $1",[req.params.articletitle], function(err, result){
       if (err){
           res.status(500).send(err.toString());}
       else {
           if (result.rows.lenght === 0)
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
/*
app.get('/submit-name/:nameid', function (req, res) {
  var name = req.params.nameid;
  name_list.push(name);
  res.send(JSON.stringify(name_list));
});

app.get('/submit-name', function (req, res) {
  var name = req.qurey.nameid;
  name_list.push(name);
  res.send(JSON.stringify(name_list));
});

*/

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

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
