import {connexion} from '../db/db.js';
import { hash } from 'bcrypt';

/**
 * fonction permettant de retrouvé l'utilisateur dont l'entré à étét saisi
 *
 * @param {Number} idUser 
 */
export async function getUserById(idUser) {
  const utilisateur =  await connexion.get(
        `SELECT * FROM utilisateur
        WHERE id_utilisateur = ?`,
        [idUser]
    );
    return utilisateur;
};

export async function getUserByCourriel(courriel) {
    const utilisateur = await connexion.get(
        `SELECT * FROM utilisateur
        WHERE courriel = ?
        `,
        [courriel]
    );
    return utilisateur;
};

export async function AddUser(courriel, nom, prenom, motdepasse) {
    const motdepassHash = await hash(motdepasse, 10);
    const result = await connexion.run(
        `INSERT INTO utilisateur(courriel, nom, prenom, mot_de_passe)
        values(?,?,?,?)`,
        [courriel, nom, prenom, motdepassHash]
    );
    return result.lastID;
}
