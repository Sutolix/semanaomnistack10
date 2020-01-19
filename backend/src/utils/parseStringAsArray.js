module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(tech => tech.trim());
    //techs.split(',') -> quebra a string nas virgulas separando assim o array
    //map(tech => tech.trim() -> percorre o array tirando os espaços em branco
}