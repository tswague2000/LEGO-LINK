
// le fetch pour la creation d'un échange
const button = document.getElementById('create_exchange');
const inputNom = document.getElementById('input_nomExchange');
const inputQuantite = document.querySelectorAll('.input_quantite');
const span = document.getElementById('span-text');
// preparation des donnéee
let data = {
    briques : []
};
// fonction qui permettra la creation des briques de l'échange
function creerBrique(id, quantite) {    
     return {         
        id_brique: id,
        quantite: quantite 
    };
}

// l'ajout d'un evenement sur le bouton click pour la creation de l'échange
button.addEventListener('click', async function(){
    if(inputNom.value.trim() !== ""){
       let checkBrique = false; 
        inputQuantite.forEach(quantite => {
           const valeur = parseInt(quantite.value, 10);
            if(valeur > 0){
                const id = parseInt(quantite.getAttribute('data-id'));
                let brique = creerBrique
                (id,valeur)
                data.briques.push(brique)
                checkBrique = true;
            }  
        });
        if(checkBrique){
            data.nameEchange = inputNom.value;
        }
    }
   
    if(data.briques.length !== 0){
        const response = await fetch('/api/echange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if(response.status === 201){
            window.location.href = '/' ;  

        }
    }
});





