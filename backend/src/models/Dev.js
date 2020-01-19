const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], //campo de tecnologia armazana várias strings
    location: {
        type: PointSchema,
        //indice que facilita a busca depois. (eixo x, eixo y)
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Dev', DevSchema);