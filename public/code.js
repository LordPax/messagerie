const socket = io()
$(() => {
	$('#form').submit((e) => {
		e.preventDefault()
		socket.emit('msg', $('#pseudo').val(), $('#msg').val() )
		$('#msg').val('')
		return false;
	})
	socket.on('msg2', (pseudo, msg) => {
		$('.msg_contenue').append(pseudo + ' : ' + msg + '<hr/>')
	})
	socket.on('conn', (status) => {
		$('.msg_contenue').append(status + '<hr/>')
	})
})