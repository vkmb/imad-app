var express = require('express');
var morgan = require('morgan');
var path = require('path');

var count = 0; 
var app = express();
app.use(morgan('combined'));
var articles = {
    "Article-One":{title: "Article One | VKMB", head: "Article One _-_-_ 10/08/2017", content: `<p>This was typed at 4:50 pm.</p><p>No conntent yet.</p>`},
    "Article-Two":{title: "Article Two | VKMB", head: "Article Two _-_-_ 10/08/2017", content: `<p>This was typed at 4:55 pm.</p><p>No conntent yet.</p>`},
    "Article-Three":{title: "Article Three | VKMB", head: "Article Three _-_-_ 10/08/2017", content: `<p>This was typed at 5 pm.</p><p>No conntent yet.</p>`}
};

function convert2html(data){
    var title = data.title;
    var head = data.head;
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
                   ${head}
                </h2>
                ${content}
            </div>
        </div>
    </body>
    
</html>
    `;
    return html_template;
}
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

var name_list =[]

app.get('/submitname', function (req, res) {
  var name = req.qurey.name;
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
app.get('/:articleid', function (req, res) {
    var an = req.params.articleid;
  res.send(convert2html(articles[an]));
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

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
