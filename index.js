const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('./dist/'))

app.get('/', (req, res) => {
    res.render('dist/main.html')
})
app.get('/main', (req, res) => {
    res.render('dist/main.html')
})
app.get('/signin', (req, res) => {
    res.render('dist/signin.html')
})
app.get('/signup', (req, res) => {
    res.render('dist/signup.html')
})
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/pages/404/404.html'))
})

app.listen(3000)