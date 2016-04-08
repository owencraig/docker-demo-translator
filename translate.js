var dict = require('./res/dict.json');
function getTranslation(toLang, fromLang, term){
    var entry = dict.find((entry) => entry[fromLang].toLowerCase() === term.toLowerCase());
    return (entry && entry[toLang]) || term;
}

module.exports = {
    getTranslation
}