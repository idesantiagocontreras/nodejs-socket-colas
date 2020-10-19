//Comando para establecer la conexion

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conexion al servidor');

    socket.emit('estadoActual', null, function(resp) {
        label.text(resp);
        console.log(resp);
    });
});

socket.on('disconnect', function() {
    console.log('Conexión con el servidor perdida');
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(resp) {
        label.text(resp);
        console.log(resp);
    });
});