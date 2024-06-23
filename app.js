//---IMPORTS---
require('dotenv').config()
// console.log(process.env)

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
var flash = require('connect-flash');
const port = 3000;

const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');




//---EXPRESS APP---
const app = express();



//---DB CONNECT---
const dbURI = 'mongodb+srv://ncc:12345@cluster0.ahve76o.mongodb.net/pauleo?retryWrites=true&w=majority&appName=Cluster0';
const connect = mongoose.connect(dbURI);

connect.then(() => {
    console.log("Database connected successfully!")
})
.catch(() => {
    console.log("Error connecting to DB")
})



//---SESSION STORE---
const store = new MongoDBStore({
    uri: 'mongodb+srv://ncc:12345@cluster0.ahve76o.mongodb.net/pauleo?retryWrites=true&w=majority&appName=Cluster0',
    collection: 'sessions'
})

store.on('error', function(error){
    console.log(error)
})



// SESSION MIDDLEWARE
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));

app.use(flash());




// Middleware to get the root URL
app.use((req, res, next) => {
    req.rootUrl = `${req.protocol}://${req.get('host')}`;
    console.log(`${req.protocol}://${req.get('host')}`)
    next();
  });

  




app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next){
    if(req.session.userId){
        return next()
    } else {
        res.status(404).send('You need to log in first!')
    }
}



//---VIEW ENGINE---
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');

console.log(__dirname)

//---STATIC FILES---
app.use(express.static(__dirname +'/assets'));



//---MIDDLEWARES---
app.use(express.urlencoded({extended: true})) //for form data
app.use(express.json());



//---ROUTING---

//index
app.get('/', (req, res) => {
    res.render('index', {title: 'Welcome', sessionData: req.session})
})

//about
app.get('/about', (req, res) => {
    res.render('about', {title: 'About', sessionData: req.session})
})

//auth routes
app.use('/auth', authRoutes)

//video routes
app.use(videoRoutes)

//404
app.use((req, res) => {
    const sessionData = req.session
    res.status(404).render('404', {title: '404', sessionData})
})




//---SERVER PORT---
app.listen(port, () => console.log(`Server started on port ${port} @ http://localhost:${port}`));