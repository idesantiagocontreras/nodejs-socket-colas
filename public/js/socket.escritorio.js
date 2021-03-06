var socket = io();

var label = $('small');

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

let escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        console.log(resp);

        if (resp === 'No hay tickets') {
            alert(resp);
            label.text(resp);

            return;
        }

        label.text('Ticket ' + resp.numero);
    });
});