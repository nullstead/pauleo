//---IMPORTS---
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');



//---EXPRESS APP---
const app = express();



//---DB CONNECT---



//---SERVER PORT---
app.listen(3000)



//---VIEW ENGINE---
app.set('view engine', 'ejs');



//---STATIC FILES---
app.use(express.static('assets'));



//---MIDDLEWARES---
app.use(express.urlencoded({extended: true})) //for form data



//---ROUTING---

//index
app.get('/', (req, res) => {
    res.render('index', {title: 'Welcome'})
})

//about
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

//auth routes
app.use('/auth', authRoutes)

//video routes
app.use(videoRoutes)

//404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})



