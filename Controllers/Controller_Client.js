const express = require('express');
let db = require('../database/database')
const {register_client, client_validation} = require('../Models/validation/validation_client')
let Clients = require('../Models/Model_Client');
let bcrypt = require('bcrypt');
let Produit = require('../Models/Model_produits');
const validation_client = require('../Models/validation/validation_client');

// les routes de base
const getIndex = (req, res)=>{
    res.send("bienvenue sur l'acceuil");
};

const get_acceuil = (req, res)=>{

  
    const message = req.flash('error')

    res.render('views_clients/register', {message})
};

const get_login = (req, res)=>{

  
   const message = req.flash('error')
    res.render('views_clients/login', {message});

}

const get_produits_client = (req, res)=>{

    Produit.get_produits(products => {

        res.render('index', {
            title: 'Home',
            path: '/Home',
            products:products
        });
    });
        
}

const post_client = (req, res)=>{

    let info_client = req.body;
    console.log(info_client);
    const response = register_client(info_client);

    if(response.error){
        
        req.flash('error', response.error.details[0].message);
        res.redirect('/register')
    }

    else{
        let nom_client = info_client.nom_client
        let email_client = info_client.email_client;
        let mot_passe_client = info_client.mot_passe_client; 
        let adresse_client = info_client.adresse_client;
        let confirm_mot_passe_client = info_client.confirm_mot_passe_client

        if(confirm_mot_passe_client != mot_passe_client){

            req.flash('error', "la confirmation du mot de passe n'est pas correcte");
            res.redirect('/register');
        }

        else{

            let sql = 'SELECT EMAIL_CLIENT FROM clients WHERE EMAIL_CLIENT = ?'
            db.query(sql, email_client, (err, result)=>{
            if(err) throw err;

            if(result.length > 0){
                req.flash('error',"ce client existe deja") 
                res.redirect('/register');

            }

            else{
                
                let haspassword = bcrypt.hashSync(mot_passe_client, 10);
                let sql = 'INSERT INTO clients SET NOM_CLIENT = ? ,  EMAIL_CLIENT = ? , MOT_DE_PASSE_CLIENT = ?, ADRESSE_CLIENT = ?';
                db.query(sql,[nom_client, email_client, haspassword, adresse_client], (err)=>{

                    if(err) throw err;
                    res.redirect('/Home');

                })
               
            }
            
        })

        }
   
    }

}

const log_in_client = (req, res)=>{
    
    const response = client_validation(req.body);
    if(response.error){
        req.flash('error', response.error.details[0].message);
        res.redirect('/login');
    }

    else{
        let email_client = req.body.email_client;
        let mot_passe_client = req.body.mot_passe_client;
        console.log(req.body);

        if(!email_client || !mot_passe_client ){

            req.flash('error',"vous n'avez pas entrez de champs")
            res.redirect('/login');
        }
        
    
        else{
    
            let sql = 'SELECT * FROM clients WHERE EMAIL_CLIENT = ? '
            db.query(sql, email_client, (err, results)=>{
    
                if(err) throw err;

                console.log(results);

                if(!results.length){

                    req.flash('error',"votre email est invalide reessaye")
                    res.redirect('/login');   
                }

                if(results.length && !bcrypt.compareSync(mot_passe_client,results[0].MOT_DE_PASSE_CLIENT)){
    
                    req.flash('error',"mot de passe incorrect")
                    res.redirect('/login');
                }

                if(results.length && bcrypt.compareSync(mot_passe_client, results[0].MOT_DE_PASSE_CLIENT)){
    
                    req.session.email_client = email_client;
                    res.render('views_clients/about', {message: ' bienvenue ' + req.session.email_client, title: 'About'});
                }
   
            }) 
        }
    }

    
            
}

const log_out_client = (req, res)=>{
    
    if(req.session.email_client){

        req.session.destroy();  
    }

    res.redirect('/register');

}


module.exports = {
    getIndex: getIndex,
    post_client: post_client,
    log_in_client: log_in_client,
    log_out_client: log_out_client,
    get_produits_client: get_produits_client,
    get_acceuil: get_acceuil,
    get_login: get_login
}