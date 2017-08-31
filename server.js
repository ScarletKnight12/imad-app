var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto=require('crypto');
var Pool=require('pg').Pool;
var config={
    user: 'kaitokudo12',
    database:'kaitokudo12',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

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

function hash(input,salt){
 var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');   
 return ["pbkdf2","10000",salt,hashed.toString('hex')].join('');
}

app.get('/hash/:input', function(req,res){

    var hashedString=hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});

var pool= new Pool(config);
app.get('/test-db',function(req,res){
    //select 
    pool.query('SELECT * FROM TEST', function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
            
        }
    });
    
});


app.get('/articles/article-one',function (req, res) {
    var articleName=article.params.articleName;
    pool.query("SELECT * FROM article where title="+req.params.articleName+"'", function(err,result)
    {
       if(err){
           res.status(500).send(err.toString());
       } 
       else{
           if(result.rows.length===0)
           {
               res.status('404').send('Article not found');
           }
           else{ 
               var articleData=result.rows[0];
               res.send(createTemplate(articleData));
       }
       }
    });
    
});

app.get('/article-two',function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three',function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
}); 
app.get('/ui/style.css',function(req,res){
   res.sendFile(path.join(__dirname,'ui','style.css'));
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
