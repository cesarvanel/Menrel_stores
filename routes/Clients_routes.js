let express = require('express');

let router = express.Router();

const ClientController = require('../Controllers/Controller_Client');


router.post('/register_client',ClientController.post_client);
router.post('/connexion', ClientController.log_in_client);
// poster les produits
router.get('/', ClientController.getIndex);
router.get('/Home', ClientController.get_produits_client)
router.get('/register', ClientController.get_acceuil);
router.get('/login', ClientController.get_login);
router.get('/out', ClientController.log_out_client);


module.exports = router;