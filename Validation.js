/**
 * fonction permettant la validation de l'id
 * @param {number} id 
 * @returns la verification la conformité de l'id 
 */
export const validateId = (id) =>
     typeof id === 'number' &&
    !Number.isNaN(id) &&
    Number.isFinite(id) &&
    id > 0;
 /**
  * fonction permettant la validation du nom de l'échange
  * @param {string} nameEchange 
  * @returns la verification de la conformité de nom de l'échange
  */   
export const validateName = (nameEchange)=>
    typeof nameEchange === 'string' &&
    nameEchange.length >= 2 &&
    nameEchange.length <= 200;

    /**
     * fonction permettant de verifier qu'il s'agit d'une table de briques
     * @param {Array} briques 
     * @returns true ou false si s'agit d'un tableau ou pas 
     */
export const validateBriques = (briques) =>{

    if(Array.isArray(briques)){
        let check = false;
        for (const brique of briques) {
            const id_brique = brique.id_brique;
            const quantite = brique.quantite;
            
            if((typeof id_brique === 'number' && !Number.isNaN(id_brique) && Number.isFinite(id_brique) &&id_brique > 0
            ) &&(typeof quantite === 'number' && !Number.isNaN(quantite) && Number.isFinite(quantite) && quantite > 0)){
                check = true;
            }
            else{
                check = false  
           }
        }
        return check;
    }      
};


export const validateCourriel = (courriel) => 
    typeof courriel === 'string' &&
    courriel.trim() !== '' &&
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,10}$/g.test(courriel);


export const validatePrenom = function(prenom){
    // if ( typeof prenom !== 'string') {
    //     return ;
    // }
    // else{
    //     const regex = /^[A-Za-zÀ-ÿ]+(?:[- ][A-Za-zÀ-ÿ]+)*$/;
    // const prenomValide = regex.test(prenom);
    //     return prenomValide;
    // }
    return true;
} 

export const validateMotDePasse = function(motdepasse) {
        // let check = false;
        // const password = motdepasse.trim();
        // if(password === ''){
        //     return check;
        // }
        // // au moins 5 caractères dans le mot de passe
        // else if(password.length < 5){
        //     return check;
        // }
    
        // // au moins 1 majuscule
        // else if(!/[A-Z]/.test(password)){
        //     return check;
        // }
        // // au moin 1 minuscule
        // else if(!/[a-z]/.test(password)){
        //     return check;
        // }
        // // au moins un chiffre
        // else if(!/[0-9]/.test(password)){
        //     return check;
        // }
        // // mot de passe valide
        // else{
        //     return check = true;
        // }  
        return true;
};

export const validateNom = function(nom){
//     let check = false;
//     if(typeof nom !== 'string'){
//         return check;
//     }
//     else if(nom.length > 2 && nom.length <= 30){
//         return check;
//     }
//     else{
//         return check= true;
//     }
return true;
}
    

//********** validation proprostion */




