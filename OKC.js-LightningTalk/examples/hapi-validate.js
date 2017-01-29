'use strict';

const Hapi = require('hapi'),
      Joi  = require('joi');

const server = new Hapi.Server();

server.connection({ port: 3000 });

server.route({
    method : 'POST',
    path   : '/user',
    handler: function (request, reply) {
        // Business logic to save the user record from request.payload

        return reply(createUserResult);
    },
    config : {
        validate: {
            payload: Joi.object().keys({
                id         : Joi.string().guid().required(),
                password   : Joi.string().min(8).required(),
                name       : Joi.string().min(3).max(15).required(),
                preferences: Joi.array().items(Joi.number().positive().integer()).min(1).required()
            })
        },
        response: {
            schema: Joi.object().keys({
                id         : Joi.string().guid().required(),
                password   : Joi.any().forbidden(), // ensuring that the user password cannot make its way back out
                name       : Joi.string().min(3).max(15).required(),
                preferences: Joi.array().items(Joi.number().positive().integer()).min(1).required()
            })
        }
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});