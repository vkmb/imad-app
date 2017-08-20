var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articles = {
    "Article-1":{title: "Article One | VKMB", head: "Article One _-_-_ 10/08/2017", content: `<p>This was typed at 4:50 pm.</p><p>No conntent yet.</p>`},
    "Article-2":{title: "Article Two | VKMB", head: "Article Two _-_-_ 10/08/2017", content: `<p>This was typed at 4:55 pm.</p><p>No conntent yet.</p>`},
    "Article-3":{title: "Article Three | VKMB", head: "Article Three _-_-_ 10/08/2017", content: `<p>This was typed at 5 pm.</p><p>No conntent yet.</p>`}
};

function convert2hmtlnjs(data){
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
        <div class="main">
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
app.get('/:articleid', funtion(req, res)){
    article_name = req.params.articleid;
    res.send(convert2htmlnjs(articles[article_name]));
    
}
app.get('/article-four',function(req, res){
  res.sendFile(path.join(__dirname,'ui','article_four.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
