let joi = require('joi');
let express = require('express');
const { ref } = require('joi');

const register_client = (data)=>{

    const schema = joi.object().keys({

        nom_client: joi.string()
                    .min(6)
                    .max(128)
                    .required(),

        email_client : joi.string()
                        .min(8)
                        .max(128)
                        .required()
                        .email(),
                        
        mot_passe_client: joi.string()
                            .min(8)
                            .max(255)
                            .required(),

        confirm_mot_passe_client: joi.string(),
                                    
                                

        adresse_client: joi.string()
                        .min(6)
                        .max(128),
                        

    });


    return schema.validate(data);


} 

const client_validation = (data)=>{

    const schema = joi.object().keys({

        email_client : joi.string()
                        .min(8)
                        .max(128)
                        .required()
                        .email(),
                        
        mot_passe_client: joi.string()
                            .min(8)
                            .max(255)
                            .required()                

    });


    return schema.validate(data)

}


module.exports = {
    register_client:register_client,
   client_validation: client_validation
}






