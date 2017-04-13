'use strict';

const Felicity = require('felicity');
const Joi = require('joi');

const userSchema = Joi.object({
    id: Joi.string().guid(),
    name: Joi.string(),
    isAdmin: Joi.boolean().default(false)
});
const itemSchema = Joi.object({
    id: Joi.number().positive().integer(),
    categories: Joi.array().items(Joi.string()).min(1)
});
const searchSchema = Joi.object().keys({
    id: Joi.string().guid().required()
});
const userOutputSchema = Joi.object({
    id: Joi.string().guid(),
    publicInfo: Joi.object({
        name: Joi.string()
    })
}).options({stripUnknown: true});

const user = Felicity.entityFor(userSchema);
const item = Felicity.entityFor(itemSchema);
const search = Felicity.entityFor(searchSchema);
const userOutput = Felicity.entityFor(userOutputSchema);

module.exports = {
    user,
    item,
    search,
    userOutput
};
