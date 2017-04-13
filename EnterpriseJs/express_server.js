'use strict';

const Express = require('express');
const BodyParser = require('body-parser');
const Joi = require('joi');
const SchemaHub = require('./schema_hub');
const app = Express();

app.use(BodyParser.json());

const validateSearch = function (req, res, next) {
    SchemaHub.search.validate(req.body, (err, value) => {
        if (err) {
            return res.status(400).send('Bad Request');
        }
        return next();
    });
};

app.post('/search', validateSearch, function (req, res) {
    const exampleDbRecord = {
        id        : '32daa3aa-7cd6-48af-9ec8-1db4a1ca9887',
        publicInfo: {
            name: 'Clara Oswald'
        },
        password: 'imp0ssibl3!1!'
    };

    return SchemaHub.userOutput.validate(exampleDbRecord, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        return res.send(result.value);
    });
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
