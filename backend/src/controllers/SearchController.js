const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
       const { latitude, longitude, techs} = request.query;

       const techsArray = parseStringAsArray(techs);

       const devs = await Dev.find({
           //retorna os devs que trabalham apenas com as tecnologias
           //buscadas
           techs:{
               //$in é um operador lógico do mongoDB
               $in: techsArray,
           },
           location: {
               $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                //10000 = 10km
                $maxDistance: 10000,
               },
           },
       });


        //busca todos os devs num raio de 10km
        //filtra por tecnologia
        return response.json({devs});
    }
}