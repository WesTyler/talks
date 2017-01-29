'use strict';

const Felicity = require('felicity'),
      Joi      = require('joi');

const userSchema = Joi.object().keys({
    id         : Joi.string().guid().required(),
    type       : Joi.string().valid(['member', 'admin']).required(),
    pass       : Joi.string().min(8).required(),
    permissions: Joi.alternatives().when('type', {
        is       : 'admin',
        then     : Joi.array().items(Joi.string().valid(['edit', 'share', 'create', 'comment'])),
        otherwise: Joi.array().items(Joi.string().valid('comment', 'request'))
    })
});

const User = Felicity.entityFor(userSchema);

const buildUserFromPayload = function(payload) {
    return new User(payload);
};

const saveUserToDB = function(user) {
    return user.validate((err, validationResult) => {
        if (err) {
            throw new Error(JSON.stringify(err));
        }
        else {
            // business logic to save document to DB
        }
    });
};

// In test suite
const generateMockUser = function() {
    return User.example();
};