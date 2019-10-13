const express = require('express')
const mysql = require('mysql')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const session = require('express-session')
const cookie = require('cookie-parser')
const port = 8080
const domain = 'http://localhost:' + port + '/'
// let pseudo = null

app.set('view engine', 'ejs')
app.set('trust proxy', 1)

app.use(cookie())
app.use(session({
	secret : 'azeazeazea',
	resave : false,
	saveUninitialized : true,
	cookie : {secure : false}
}))
app.use('/assets/', express.static('public'))
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => {
	// console.log(req.session.pseudo + '3')
	res.render('pages/index')
})
app.get('/main', (req, res) => {
	// if (req.session.pseudo){
		// console.log(req.session.pseudo + '2')
		res.render('pages/msg')
		let pseudo = req.session.pseudo
	// }
	// else{
		// res.redirect('/')
	// }
})
// app.post('/', (req, res) => {
// 	if (req.body.pseudo !== undefined && req.body.pseudo !== '') {
// 		req.session.pseudo = req.body.pseudo
// 		// console.log(req.session.pseudo + '1')
// 		res.redirect('/main')
// 	}
// })

//io.emit('some event', {for : 'everyone'})

io.on('connection', socket => {
	//io.emit('conn', pseudo + ' vien de ce connecter')
	socket.on('msg', data => {
		if (data.pseudo !== undefined && data.msg !== '') {
			if (data.pseudo === undefined || data.pseudo === '') pseudo = "Annon"
			socket.broadcast.emit('msg', data.pseudo, data.data)
		}
	})
})

http.listen(port, () => { console.log('ecoute le port ' + port + ' ...') })

// app.listen(port)