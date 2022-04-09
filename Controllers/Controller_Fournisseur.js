const express = require('express');

const get_Index_Fournisseur = (req, res)=>{
    res.send('bienvenue sur la page fournisseur');
}

module.exports = {
    get_Index_Fournisseur: get_Index_Fournisseur 
};