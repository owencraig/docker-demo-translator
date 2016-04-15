'use strict';

var app = require('express')();
var getTranslation = require('./translate').getTranslation;
var moment = require('moment');

const APP_PORT = process.env.APP_PORT || 3000;
const RESPONSE_DELAY = process.env.RESPONSE_DELAY || 1;
const BASE_RESPONSE = Object.freeze({
   source: `${process.env.APP_NAME || 'trans' }: ${getDateString()}`
});

app.get('/:toLang/:fromLang/:term', (req, res) => {
    log(`Request received ${req.params.term}: ${req.params.fromLang} => ${req.params.toLang}`);
    let translator = getTranslation.bind(null, req.params.toLang, req.params.fromLang);
    setTimeout(() => res.json(buildResponse(BASE_RESPONSE, translator, req.params.term)), RESPONSE_DELAY);
});

function buildResponse(baseResponse, translator, term){
    var translated = translator(term);
    log(`Translation found for ${term} => ${translated}`);
    return Object.assign({}, baseResponse, {
        original: term,
        translated
    });
}

function getDateString(date){
    return moment(date).format('YYYY-MM-DD hh:mm:ss.SSS')
}

function log(message){
    console.log(`${getDateString()}: ${message}`);
}


app.listen(APP_PORT, () => log(`translator listening on port ${APP_PORT}`));