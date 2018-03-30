const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.port || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log =  `${now}: ${req.method} ${req.url}`;
    next();
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
});

app.use((req,res,next)=>{
    res.render('maintaince.hbs');
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
   res.render(('home.hbs'),{
        pageTittle: 'Home page',
        welcomeMessage: 'Welcome to my website',
   })
});

app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTittle: 'About Page',
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Unable to handle requet'
    });
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});