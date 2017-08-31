// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
var name_list =[]
var count = 0;
var config  = {
    user:'mithun14leo',
    database : 'mithun14leo',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password : process.env.DB_PASSWORD
}
// Libaries 

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bp = require('body-parser');
var app = express();
var pool = new Pool(config);

//

app.use(morgan('combined'));
app.use(bp.json());

// logical
function hash(value,salt){
    var return_value = crypto.pbkdf2Sync(value, salt, 10000, 512, 'sha512');
    return ['pbkdf', salt, '10000', return_value.toString('hex')].join('$');
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

//end pionts

app.post('/log-user',function(req,res){
    var usna = req.body.username;
    var pass = req.body.password;
    
    
    pool.query('SELECT * from all_db WHERE usna = $1', [usna], function(err, result){
        if (err){
            res.send(500).send(err.toString());
        }
        else {
            if (result.rows.length === 0){
                
                res.send(403).send('Username does not exsist');
            }
            else{
                var dbstr = result.rows[0].password;
                var salt = db.split('$')[1];
                var dbhp = db.split('$')[3];
                var pa = hash(pass, salt)
                if (pa === dbhp){
                    res.send(200).send('Welcome... '+ usna );
                }
                else {
                    res.send(403).send('Invalid Password');
                }
            }
        }
    });
});

app.post('/create-user',function(req,res){
    var usna = req.body.username;
    var pass = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    pass = hash(pass, salt);
    pool.query('INSERT INTO all_db (usna, pass) VALUES ($1, $2)', [usna, pass], function(err, result){
        if (err){
            res.send(500).send(err.toString());
        }
        else{
            res.send(200).send('Hello '+ usna);
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
app.get('/accounts', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'silo.html'));
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
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
