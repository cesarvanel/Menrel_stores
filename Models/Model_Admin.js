let express = require('express');

// importation de la base de donnees
let db = require('../database/database');

class Admin{

    constructor(nom_admin, email_admin, mot_passe_admin){

        this.nom_admin = nom_admin; 
        this.email_admin = email_admin;
        this.mot_passe_admin = mot_passe_admin;   
    };

    // methode pour les attribut

    static get_admin(callback){
        let sql = 'SELECT * FROM admins';
        db.query(sql,(err, result)=>{
            if(err) throw err ;
            callback(result);
        });
    }
         
}




module.exports = Admin


