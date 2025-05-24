// ajout des configuration
import 'dotenv/config';

import https from 'node:https';
import { readFile } from 'node:fs/promises';
import express, { json, request } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { engine } from 'express-handlebars';
import { userConnected} from './middlewares/middleware.js'
import session from 'express-session';
import memorystore from 'memorystore'; 
import passport from 'passport';
import { getAllExchanges, getUserExchanges, deleteEchange, getAllBriques, createExchange, getEchangeDetails, calculValeurGlobaleApprox, CreateProposition, Getproposition, viewDetailsProposition} from './model/echanges.js';
import { validateBriques, validateId,validateName, validateCourriel, validateMotDePasse, validatePrenom, validateNom } from './Validation.js';
import './auhentification.js';
import {AddUser } from './model/utilisateur.js';
// creation du server

const app = express();

// creation de la base de donnée pour la session
const MemoryStore = memorystore(session);
// ajout des engins
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Ajout de middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(json());
app.use(session({
    cookie: { maxAge: 3600000 },
    name: process.env.npm_package_name,
    store: new MemoryStore({ checkPeriod: 3600000 }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use('/assets', express.static('assets'));


// programmation des routes pour les handlebars
// route pour la generation de la page d'accueil 
app.get('/', async (request, response) => {

    response.render('Home', {
        titre: 'Accueil',
        styles: [''],
        scripts :['/js/Home.js'],
        Exchanges: await getAllExchanges(),
        user : request.user
    });
});

// route pour la generation de la page html contenant tout les échanges du compte courant
app.get('/echangesUser', async (request, response) => {

    const id = request.user.id_utilisateur;
    response.render('profil', {
        titre: 'Échanges Utilisateur',
        styles: ['/css/Profil.css','/css/Home.css'],
        scripts :['/js/profil.js','/js/Home.js'],
        exchangesUser: await getUserExchanges(id),
        user : request.user
      
    });
});

// route pour voir l'échanges

// route pour la generation de la page html permettant de creer un échange
app.get('/createEchange', async (request, response) => {


    response.render('createEchange', {
        titre: 'Création de l\'échange',
        styles: ['/css/createEchange.css','/css/Home.css'],
        scripts :['/js/createEchange.js', '/js/Home.js'],
        Briques : await getAllBriques(),
        user : request.user
    });
});
// route pour la generation de la page html pour voir un échange  spécifique
app.get('/echange/:id', async (request, response) => {
        const id = request.params.id;

    response.render('echange', {
        titre: 'Échange',
        styles: ['/css/echange.css','/css/Home.css'],
        scripts :['/js/echangeDetails.js', '/js/Home.js'],
        Exchange : await getEchangeDetails(id),
        user : request.user
    });
});

// generation de la page pour creer une proposition
app.get('/proposition', async (request, response) => {

    response.render('createProposition', {
        titre: 'Création Proposition',
        styles: ['/css/createProposition.css','/css/Home.css'],
        scripts :['/js/createProposition.js'],
        Briques : await getAllBriques(),
        user : request.user
        
    });
});

// geneeration de la page pour voir une proposition
app.get('/viewProposition', async (request, response) => {
    
    response.render('viewProposition', {
        titre: 'Voir Proposition',
        styles: ['/css/viewProposition.css','/css/Home.css'],
        scripts :['/js/viewProposition.js'],
        proposition : await viewProposition(request.body),
        user : request.user
        
    });
});
// generation de la page creation d'une proposition
app.get('/api/connexion', async (request, response) => {

    response.render('login', {
        titre: 'Connexion',
        styles: ['/css/login.css','/css/Home.css'],
        scripts :['/js/login.js','/js/Home.js'],
        user : request.user
        
    });
});


// generation de la page 
app.get('/api/inscription', async (request, response) => {

    response.render('createAccount', {
        titre: 'Créer Un Compte',
        styles: ['/css/createAccount.css','/css/Home.css'],
        scripts :['/js/createAccount.js', '/js/Home.js'],
        user : request.user
        
    });
});



// fin de la programmation des routes du handlebars

                            //****************************************************************************//

// début de programmation de route  des requêtes du model

// methode pour recupere les echanges de tous les utlisatuers
app.get ('/api/echanges', async (req, res)=>{

        const echanges = await getAllExchanges();
        res.status(200).json( echanges);
    
});

// Route pour récupérer les échanges de l'utilisateur 
app.get('/api/echangesUser/:id', userConnected, async (request, response) => {

        const id = request.params.id;
        id = request.user;
       if ( validateId( parseInt(id))){
        const echanges = await getUserExchanges(id);
        response.status(200).json(echanges);
       } 
       else{
        response.status(400).end();
       }   
});




// route pour suppression d'un échnage
app.delete('/api/echange/:id', userConnected, async (req, res) => {
    
    const id = req.params.id;

    if (validateId(parseInt(id))) {
        const isDeleted = await deleteEchange(id);
        if(isDeleted){
            res.status(200).json({ message: 'Échange supprimé avec succès' });
        }
        else {
             res.status(404).json({ message: "Échange non trouvé" });
        }
    }
    else{
        res.status(400).end();
    }
});


// Route pour obtenir toutes les briques disponibles
app.get('/api/briques', async (req, res) => {
    try {
        const briques = await getAllBriques();
        res.status(200).json(briques);
    } catch (error) {
        console.error("Erreur lors de la récupération des briques:", error);
        res.status(500).send("Erreur serveur");
    }
});

// Route pour créer un échange
app.post('/api/echange', userConnected, async (req, res) => {
    const idUser = req.user.id_utilisateur;
    const name = req.body.nameEchange; 
    const briques = req.body.briques; 
   
    if(validateName(name) && validateBriques(briques)){
        const echangeId = await createExchange( idUser,name, briques);
        res.status(201).json({ message: "Échange créé avec succès", echangeId });
    }
    res.status(400).end();    
});

// Route pour récupérer les détails d'un échange spécifique
app.get('/api/echangeDetails/:id', async (req, res) => {
    const idEchange = req.params.id; 

    if (validateId(parseInt(idEchange))) {
        const detailsEchange = await getEchangeDetails(idEchange);
        res.status(200).json(detailsEchange);
    }
    res.status(400).end();
});

// Route pour afficher la valeur globale approximative de l'échange
app.get('/api/echangeValeurApprox/:id', async (req, res) => {
    const idEchange = req.params.id;
    if (validateId(parseInt(idEchange))) {
        const valeurGlobale = await calculValeurGlobaleApprox(idEchange);
        res.status(200).json({valeurGlobale})
    }
    res.status(400).end();
});

// route pour la création d'une proposition
// Route pour créer une proposition
app.post('/api/createProposition', async (request, response) => {
    const { briques } = request.body;
    const idEchange = request.body.idEchange;
    const idUtilisateur = request.user.id_utilisateur;


    if (validateId(idEchange) || validateId(idUtilisateur) || validateBriques(briques)) {
        return response.status(400).json({ error: "Données invalides ou proposition vide." });
    }

    try {
        const result = await CreateProposition(idEchange, idUtilisateur, briques);
        response.status(201).json(result.body);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Erreur interne du serveur." });
    }
});

//route pour voir les proposition par echange
app.get('/api/ViewProposition', async (request, response) => {
    const idEchange = request.body.id;

    try {
        const propositions = await Getproposition(idEchange);

        if (!propositions || propositions.length === 0) {
            // Pas de propositions trouvées
            return response.status(404).json({ error: "Aucune proposition trouvée pour cet échange." });
        }

        // Propositions trouvées
        response.status(200).json({ message: "Propositions récupérées avec succès.", data: propositions });
    } catch (error) {
        console.error("Erreur dans la route:", error.message);
        response.status(500).json({ error: "Erreur interne du serveur."});
    }
});


// route pour ajouter un utilisateur
app.post('/api/user', async (request, response) => {
    if(request.user) {
        response.status(400).end();
        return;
    };

    if(validateCourriel(request.body.courriel) &&
       validateMotDePasse(request.body.motdepasse)&& validatePrenom(request.prenom) && validateNom(request.nom)) {
        
        try{
            await AddUser(
                request.body.courriel,
                request.body.nom,
                request.body.prenom,
                request.body.motdepasse,
            );
    
            response.status(201).end();
        }
        catch(erreur){
            if(erreur.code === 'SQLITE_CONSTRAINT') {
                response.status(409).end();
            }
            else {
                next(erreur);
            }
        }
    }
    else {
    response.status(400).end();
}
});



// creation de la route pour la connexion
app.post('/api/connexion', (request, response, next) => {
    if(request.user) {
        response.redirect('/');
        return;
    }

    if(validateCourriel(request.body.courriel) &&
       validateMotDePasse(request.body.motdepasse)) {
        passport.authenticate('local', (erreur, utilisateur, info) => {
            
            if(erreur) {
                next(erreur);
            }
            else if(!utilisateur) {
                response.status(401).json(info)
            }
            else {
                request.logIn(utilisateur, (erreur) => {

                    if(erreur) {
                        next(erreur);
                    }
                    response.status(200).end();
                });
            }
        })(request, response, next);
    }
    else {
        response.status(400).end();
    }
});

// creation de la route pour la déconnexion de l'utilisateur

app.post('/api/deconnexion', userConnected, (request, response, next) => {
    request.logOut((erreur) => {
        if(erreur) {
            next(erreur);
        }
        console.log("deconnecté avec succès");
        response.redirect('/');
    });
});

// demarage du server
if (process.env.NODE_ENV === 'production') {
    app.listen(process.env.PORT);
    console.log('Serveur démarré:');
    console.log('http://localhost:' + process.env.PORT);
}
else {
    const credentials = {
        cert: await readFile('./security/localhost.cert'),
        key: await readFile('./security/localhost.key')
    };
    console.info('Serveurs démarré ');
    console.info(`https://localhost:${process.env.PORT}`);
    https.createServer(credentials, app).listen(process.env.PORT)
}




