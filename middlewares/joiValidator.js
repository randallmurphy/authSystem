const joi = require('joi');

exports.signupSchema = joi.object({
    email: joi.string()
        .min(6)
        .max(60)
        .required()
        .email({
            tlds:{allow:['com','net','org']}
        }),
    password: joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$'))
        
})

exports.signinSchema = joi.object({
    email: joi.string()
        .min(6)
        .max(60)
        .required()
        .email({
            tlds:{allow:['com','net','org']}
        }),
    password: joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$'))
        
})