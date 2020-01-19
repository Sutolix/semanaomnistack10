import socketio from 'socket.io-client';

//mesmo endereço da api.js
const socket = socketio('http://localhost:3333', {
    autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction) {
    //ouvi o evento e dispara a subscribeFunction
    socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
    //pra enviar os dados para o backend
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    }
    socket.connect();
}

function disconnect() {
    if (socket.connected){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
};