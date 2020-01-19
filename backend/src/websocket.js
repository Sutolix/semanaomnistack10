const socketio = require ('socket.io');

const parseStringAsArray = require ('./utils/parseStringAsArray');
const calculateDistance = require ('./utils/calculateDistance');

//armazena a conexão definindo-a externamente para ter acesso dela no sendMessage
let io;
//pra armazenar todas as conexões feitas. Normalmente usariamos
//um banco de dados pra armazenar, mas como está é apenas uma aplicação
//de estudo, iremos armazenar em uma variavel mesmo
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);

    //para ouvir o evento de conexão
    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude), //normalmente ele manda como string, por isso convertemos como número
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};

//retorna as conexões que estão a 10km do usuário e que tem as techs que ele filtrou
exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        //compara as coordenadas atuais do user com as do novo dev cadastrado e se são menores que 10km
        return calculateDistance(coordinates, connection.coordinates) < 10
        //retorna true se pelo menos uma tech coincidir com a pesquisa
        && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}