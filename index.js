'use strict';

var app = require('express')();
var getTranslation = require('./translate').getTranslation;
var moment = require('moment');

const APP_PORT = process.env.APP_PORT || 3000;
const COOL_DOWN = process.env.COOL_DOWN || 0;
const BASE_RESPONSE = Object.freeze({
   source: `${process.env.APP_NAME || 'trans' }: ${getDateString()}`
});

var promise = Promise.resolve();

app.get('/:toLang/:fromLang/:term', (req, res) => {
    log(`Request received ${req.params.term}: ${req.params.fromLang} => ${req.params.toLang}`);
    let translator = getTranslation.bind(null, req.params.toLang, req.params.fromLang);

    // simluate some long blocking process
    promise = promise
        .then(() => log(`Request processing ${req.params.term}: ${req.params.fromLang} => ${req.params.toLang}`))
        .then(() => res.json(buildResponse(BASE_RESPONSE, translator, req.params.term)))
        .then(() => pause(COOL_DOWN));
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


function pause(time){
    return new Promise(function(resolve){
        setTimeout(() => resolve(), time);
    });
}

app.listen(APP_PORT, () => log(`translator listening on port ${APP_PORT}`));