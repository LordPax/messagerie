$(() => {
	const socket = io() // 'http://localhost:8080/main'
	// const pseudo = prompt('pseudo'),

	$('#form').submit((e) => {
		e.preventDefault()
		let msg = $('#msg').val()
		socket.emit('msg', {pseudo : pseudo, msg : msg})
		//$('.msg_contenue').append(pseudo + ' : ' + msg + '<hr/>')
		msg.val('')
		return false;
	})

	socket.on('msg', (data) => {
		$('.msg_contenue').append(data.pseudo + ' : ' + data.msg + '<hr/>')
	})

	socket.on('conn', (status) => {
		$('.msg_contenue').append(status + '<hr/>')
	})
})