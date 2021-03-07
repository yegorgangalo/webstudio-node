const Joi = require('joi');

function validateMailing(req, res, next) {
    const rulesMailing = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    });

    const {error} = rulesMailing.validate(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }

    next();
}

function validateForm(req, res, next) {
    const rulesForm = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        tel: Joi.string().pattern(new RegExp('^380[0-9]{9}(\s*)?$')).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        message: Joi.valid(),
    });

    const {error} = rulesForm.validate(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }

    next();
}

module.exports = { validateMailing, validateForm }