const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },


    //async significa que a api do github pode demorar pra responder
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        //declarando a variavel como let permite que ela seja sobreposta (declarada duas vezes)
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            //o await faz ele esperar a resposta antes de continuar
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            //se o name não existir (já que no git ele não é obrigatório), ele usa o valor de login
            const { name = login, avatar_url, bio } = apiResponse.data;


            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                //mongo lida sempre com a longitude primeiro e depois a latitude
                coordinates: [longitude, latitude],
            }


            dev = await Dev.create({
                //Com exceção do techs, os outros não precisam do : pois como a propriedade e o nome
                //da variavel tem o mesmo nome, pois ele entende
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            // Filtrar as conexões que estão no máximo 10km de distância
            //e que o novo dev tenha pelo menos uma das tecnologias filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    }
}