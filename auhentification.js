import { compare } from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUserByCourriel, getUserById} from'./model/utilisateur.js';

// préparation des données
const config = {
    usernameField: 'courriel',
    passwordField: 'motdepasse'
};

passport.use(new Strategy(config, async (courriel, motdepasse, done) => {
    try {
        const utilisateur = await getUserByCourriel(courriel);
        if(!utilisateur) {
            return done(null, false, { erreur: 'mauvais_courriel' });
        }

        const valide = await compare(motdepasse, utilisateur.mot_de_passe);

        if(!valide) {
            return done(null, false, { erreur: 'mauvais_motdepasse' });
        }
        return done(null, utilisateur);
    }
    catch(erreur) {
        return done(erreur);
    }
}));

passport.serializeUser((utilisateur, done) => {
    done(null, utilisateur.id_utilisateur);
});

passport.deserializeUser(async (idUtilisateur, done) => {
    try{
        const utilisateur = await getUserById(idUtilisateur);
        done(null, utilisateur);
    }
    catch(erreur) {
        done(erreur);
    }
});