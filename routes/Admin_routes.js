let express = require('express');

let router = express.Router();
const Admin_Controller = require('../Controllers/Controller_Admin');

// les methodes get de l'admin

// page d'acceuil
router.get('/', Admin_Controller.get_Index_Admin);



// les methodes post pour l'admin
router.post('/register', Admin_Controller.post_admin);
router.post('/login', Admin_Controller.log_admin);
router.post('/log_out', Admin_Controller.log_out);

// crud sur les produits
router.get('/produit', Admin_Controller.get_produit);
router.get('/get/produit/:id', Admin_Controller.get_produit_id);
router.post('/register/produit/', Admin_Controller.post_produit);
router.delete('/delete/produit/:id', Admin_Controller.del_produit);
router.put('/update/produit/:id', Admin_Controller.up_produit);

module.exports = router;