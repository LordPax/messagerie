const express = require('express')
const mysql = require('mysql')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const port = 8080
const domain = 'http://localhost:' + port + '/'

app.set('view engine', 'ejs')

app.use('/assets/', express.static('public'))
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => {
	res.render('pages/index')
})

//io.emit('some event', {for : 'everyone'})

io.on('connection', (socket) => {
	io.emit('conn', 'une personne vien de ce connecter')
	socket.on('msg', (pseudo, msg) => {
		if (msg !== undefined && msg !== '') {
			if (pseudo === undefined || pseudo === '') pseudo = "Annon"
			io.emit('msg2', pseudo, msg)
		}
	})
})

http.listen(port, () => { console.log('ecoute le port ' + port + ' ...') })

// app.listen(port)