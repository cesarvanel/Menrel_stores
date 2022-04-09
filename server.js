const  express = require('express');
const bodyparser = require('body-parser');
const Route_Client = require('./routes/Clients_routes');
const Route_Admin = require('./routes/Admin_routes');
const Route_Fournisseur = require('./routes/Fournisseur_routes');
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const session = require('express-session');

let app = express()

const port = process.env.PORT || 8000;

// les fichiers statiques 

app.use(express.static(__dirname + 'publics'));

// les templates 
app.set('view engine', 'ejs');

// les middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser('secretstringforcookie'))
app.use(flash())
app.use(session({
    secret: "ABEDKDFD",
    resave: false,
    saveUninitialized: true,
    cookie:{secure: false}
}));

// gerer les messages d'erreurs


// les routes de l'application
app.use('/', Route_Client);
app.use('/admin', Route_Admin);
app.use('/fournisseur', Route_Fournisseur);


// la navigation 

app.listen(port , ()=> console.log(`serveur lance sur le port ${port}`));

