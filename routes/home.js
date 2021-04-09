

const route = require('express').Router()
const path = require('path')


route.get('/', (req, res)=>{
	res.sendFile('index.html')
})

route.get('/login', (req, res)=>{
	res.sendFile(path.join(__dirname, '../static/login.html'))
})

route.get('/about', (req, res)=>{
	res.sendFile(path.join(__dirname, '../static/about.html'))
})

route.get('/contact', (req, res)=>{
	res.sendFile(path.join(__dirname, '../static/contact.html'))
})

route.get('/blog', (req, res)=>{
	res.sendFile(path.join(__dirname, '../static/blog.html'))
})

route.get('/register', (req, res)=>{
	res.sendFile(path.join(__dirname, '../static/register.html'))
})

module.exports = route