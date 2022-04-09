let express = require('express');
let router = express.Router();
const Fournisseur_Controller = require('../Controllers/Controller_Fournisseur');

router.get('/',Fournisseur_Controller.get_Index_Fournisseur);

module.exports = router;