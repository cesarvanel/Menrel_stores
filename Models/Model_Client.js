let express = require('express');
const db = require('../database/database');

class Clients {

    constructor(id_client, nom_client , email_client, mot_passe_client, adresse_client){

        this.id_client = id_client;
        this.nom_client = nom_client;
        this.email_client = email_client;
        this.mot_passe_client = mot_passe_client;
        this.adresse_client = adresse_client;
    }
    // methode 
}

module.exports = Clients
