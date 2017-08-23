var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articleOne={
    title:' Whew! Long time since i coded in HTML!',
    heading: 'Note To me',
    date: 'aug 8' ,
    content:`<p> Para 1. 100 ways to be what i want to be.</p>
    <p> Oh wait, i aldready am what i am, which is what i wanna be. AWESOMEE! :D B) </p>`
    
};
function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate= ` <html>
        <title>${title}</title>
        <body> 
           This is the fabled article one folks. be sure to read carefully ;)
        <div> Division 1 I guess....i'll call this cheese *-* </div>
        <hr/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
        <div class="container">
        <div> 
           <a href ="/"> Home </a>
        </div>
        <hr/>
        <h3>${heading}</h3>
        ${content}
        </div>
        </body>   
    </html>
    
    `;  
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/article-one',function (req, res) {
     res.send(createTemplate(articleOne));
});

app.get('/article-two',function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three',function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
