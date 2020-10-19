const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('estadoActual', (data, callback) => {
        let estadoActual = ticketControl.getUltimo();
        callback(estadoActual);

        console.log(estadoActual);

    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimo(),
        ultimos4: ticketControl.getUltimos4(),
    });

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);

        console.log(siguiente);

    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El Escritorio es necesario'
            });

        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        client.broadcast.emit('Ultimos4', {
            actual: ticketControl.getUltimo(),
            ultimos4: ticketControl.getUltimos4(),
        });
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
});