'use strict';

var app = require('express')();
var getTranslation = require('./translate').getTranslation;
var moment = require('moment');

const APP_PORT = process.env.APP_PORT || 3000;
const BASE_RESPONSE = Object.freeze({
   source: `${APP_PORT}: ${moment().format('YY-MM-DD hh:mm:ss.SSS')}` 
});

app.get('/:toLang/:fromLang/:term', (req, res) => {
    let translator = getTranslation.bind(null, req.params.toLang, req.params.fromLang);
    res.json(buildResponse(BASE_RESPONSE, translator, req.params.term));
});

function buildResponse(baseResponse, translator, term){
    var translated = translator(term);
    console.log(`Translation found for ${term} => ${translated}`);
    return Object.assign({}, baseResponse, {
        original: term,
        translated
    });
}


app.listen(APP_PORT, () => console.log(`translator listening on port ${APP_PORT}`));