//---IMPORTS---
const express = require('express');



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

//register
app.get('/signup', (req, res) => {
    res.render('auth/signup', {title: 'Register'})
})

//login
app.get('/login', (req, res) => {
    res.render('auth/login', {title: 'Log in'})
})

//video page
app.get('/video', (req, res) => {
    res.render('videos/video', {title: 'Video'})
})

//admin upload videos
app.get('/upload-videos', (req, res) => {
    res.render('admin/upload-videos', {title: 'Admin - Upload'})
})

//admin list videos
app.get('/list-videos', (req, res) => {
    res.render('admin/list-videos', {title: 'Admin - Videos'})
})

//404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})



