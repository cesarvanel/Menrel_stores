let express = require('express')

let db = require('../database/database');


class Produit {

    constructor(id_produit, nom_produit, prix_produit, description_produit, image_produit){
        this.id_produit = id_produit,
        this.nom_produit = nom_produit, 
        this.prix_produit = prix_produit,
        this.description_produit = description_produit,
        this.image_produit = image_produit
    }

    // les  setteurs et les getteurs de la classe 

    get_id_produit(){
        return this.id_produit;
    }

    // consulter tous  les produits 

    static get_produits(callback){

        let sql = 'SELECT * FROM produits';

        db.query(sql, (err, results)=>{
            if(err) return err;
            callback(results);
        });
    }


    static get_produits_id(id_produit, callback){

        let sql = 'SELECT * FROM produits WHERE ID_PRODUIT = ?';
        db.query(sql, id_produit, (err, results)=>{
            if(err) throw err;

            callback(results);
        })

    }


    // poster un produit

    static post_Produits(contenu, callback){

        let sql = 'INSERT INTO produits set ?';  //( `ID_STOCK`, `ID_CATEGORIE`, `ID_FOURNISSEUR`, `NOM_PRODUIT`, `PRIX_PRODUIT`, `DESCRIPTION_PRODUIT`)';

        db.query(sql,contenu,(err, results)=>{
            if(err) throw err;

            callback(results);    
        });
    };


    static delete_produit(id_produit, callback){

        let sql = 'DELETE FROM produits WHERE ID_PRODUIT = ?';

        db.query(sql, id_produit, (err, results)=>{ 

            if(err) throw err;

            callback(results);
        })
    }

    static update_produit(nom_produit,prix_produit,description_produit,id_produit, callback){

        let sql = 'UPDATE produits SET NOM_PRODUIT = ? , PRIX_PRODUIT = ? , DESCRIPTION_PRODUIT = ? WHERE ID_PRODUIT = ?' ;

        db.query(sql,[nom_produit,prix_produit,description_produit,id_produit], (err, results)=>{
            if(err) throw err; 
            
            callback(results);

        });
    }



}


module.exports = Produit;