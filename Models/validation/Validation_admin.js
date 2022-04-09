let joi = require('joi');
let express = require('express');
const { ref } = require('joi');

const register_admin = (data)=>{

    const schema = joi.object().keys({

        nom_admin: joi.string()
                    .min(6)
                    .max(128)
                    .required(),

        email_admin : joi.string()
                        .min(8)
                        .max(128)
                        .required()
                        .email(),
                        
        mot_passe_admin: joi.string()
                            .min(8)
                            .max(255)
                            .required(),

        confirm_mot_passe_admin: joi.ref('mot_passe_admin')                                  

    });


    return schema.validate(data);


} 

const login_admin = (data)=>{

    const schema = joi.object().keys({

        email_admin : joi.string()
                        .min(8)
                        .max(128)
                        .required()
                        .email(),
                        
        mot_passe_admin: joi.string()
                            .min(8)
                            .max(255)
                            .required()                

    });


    return schema.validate(data)

}


module.exports = {
    register_admin:register_admin,
    login_admin:login_admin
}






