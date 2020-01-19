const express = require('express');
//banco de dados
const mongoose = require('mongoose');
const cors = require('cors');
//para a aplicação ouvir tanto as requisições http como as de web socket
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');






const app = express();
//para extrair o servidor http de dentro do express
const server = http.Server(app);

//instancia o socket enviando para o servidor, assim dispara
//a função assim que o server iniciar
setupWebsocket(server);



//MongoDB (banco de dados não-relacional)
mongoose.connect('mongodb+srv://lotus:miku39@cluster0-fgpbt.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//poderia por {'localhost:3000'} dentro do parenteses do cors, mas deixando como está
//ele permite coneção de qualquer lugar. 
app.use(cors());
//valida pra todas as rotas e faz o express entender requisições
//com corpo no formato json
app.use(express.json());
app.use(routes);

server.listen(3333);