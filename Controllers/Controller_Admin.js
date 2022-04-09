let express = require('express');
let db = require('../database/database');
const {register_admin, login_admin} = require('../Models/validation/Validation_admin');
let bcrypt = require('bcrypt');
let Admin = require('../Models/Model_Admin');
let Produit = require('../Models/Model_produits');

const get_Index_Admin = (req, res)=>{

  Admin.get_admin(data =>{
        console.log(data);
       // res.render('index/index');
       res.send(data);
    });
    
}

const post_admin = async (req, res)=>{

    const response = register_admin(req.body);
    // verification si il y'a une erreur
    if(response.error){
        res.send(response.error.details[0].message);
    }
    let nom_admin = req.body.nom_admin;
    let email_admin = req.body.email_admin;
    let mot_passe_admin = req.body.mot_passe_admin;
    let confirm_mot_passe_admin = req.body.confirm_mot_passe_admin;

    console.log(nom_admin + ' ' + email_admin + ' ' + mot_passe_admin);
    // verifions si l'email existe deja 

    if(confirm_mot_passe_admin == mot_passe_admin)

        db.query('SELECT * FROM admins WHERE EMAIL_ADMIN = ?', email_admin, (err, results)=>{
        if(err) throw err;

        if(results.length > 0 ){
            
            res.send('cette admin est deja la'); 
            
        }

            // res.redirect('/register_admin')  sur la ge register

        else{

            let mot_passe_admin_hashe = bcrypt.hashSync(mot_passe_admin, 10);
            let sql ='INSERT INTO admins SET NOM_ADMIN = ? , EMAIL_ADMIN = ? , MOT_DE_PASSE_ADMIN = ?';
            db.query(sql ,[nom_admin, email_admin, mot_passe_admin_hashe], (err)=>{

                if(err) throw err
                res.send('new admin is here');
               // res.redirect('/admin')  la page admin
            })
        }

    });

    else{
        //res.redirect('/admin')  la page admin 
        res.send('error');
    }
             
}


const log_admin = (req, res) =>{

    const response = login_admin(req.body);

    if(response.error){
        res.send(response.error.details[0].message)
    }

    let email_admin = req.body.email_admin;
    let mot_passe_admin = req.body.mot_passe_admin;

    let sql = 'SELECT * FROM admins WHERE EMAIL_ADMIN = ?';

    db.query(sql, email_admin, (err, results)=>{
        if(err) throw err

        if(results.length && bcrypt.compareSync(mot_passe_admin ,results[0].MOT_DE_PASSE_ADMIN)){

            req.session.email_admin = email_admin
            res.send('bienvenue monsieur zoleko' + req.session.email_admin);
            console.log(results[0].MOT_DE_PASSE_ADMIN)           
            //res.redirect('/admin')
        }

        else{
            res.send('une erreur est survenue');
        }
    })

}

const log_out = (req, res)=>{

    if(req.session.email_admin){
        req.session.destroy()
        //res.redirect('/register')
    }

   
}


//methode get pour voir tous les produits 

const get_produit = (req, res)=>{

    Produit.get_produits(produit =>{
        res.send(produit);
    });
}

const get_produit_id = (req, res)=>{
    
    const id = req.params.id

    Produit.get_produits_id(id,(results)=>{

        res.send(results);
    })
}


const post_produit = (req, res) =>{

    let params = req.body;
    Produit.post_Produits(params, (result)=>{

        //res.redirect('/')
        res.send('success');

    });

}

const del_produit = (req, res) =>{

    let id_produit = req.params.id;

    Produit.delete_produit(id_produit, (result)=>{

        res.send('success');
        
    });

}

const up_produit = (req, res)=>{

    const  id = req.params.id

    let nom_produit = req.body.NOM_PRODUIT;
    let prix_produit = req.body.PRIX_PRODUIT;
    let description_produit = req.body.DESCRIPTION_PRODUIT;

    console.log(nom_produit + prix_produit  + description_produit);

   Produit.update_produit(nom_produit, prix_produit, description_produit,id,(results)=>{

        res.send('reusiite');

    });
}


module.exports = {
    get_Index_Admin: get_Index_Admin,
    post_admin: post_admin,
    log_admin: log_admin,
    log_out: log_out,
    get_produit: get_produit,
    get_produit_id: get_produit_id,
    post_produit: post_produit,
    del_produit: del_produit,
    up_produit: up_produit,

}
