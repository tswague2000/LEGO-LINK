// recupération des élement html
const btnSubmit = document.getElementById('create-proposition');
const inputNom = document.getElementById('input-popositionName');
const inputQuantite = document.getElementById('input-quantity');
const errorName = document.getElementById('error-text');
const errorQuantity = document.getElementById('error-quantity');
const quantites = document.querySelectorAll('.input_quantite');




// validation des briques

function validateQuantity(quantites) {
    
    const value = quantites.value;
        if (value === '') {
            errorQuantity.innerText = "Veuillez saisir une quantité ";
            errorQuantity.classList.add('error');
            return false;
        } 
        else if(value < 1 || value > 500){
            errorQuantity.innerText = "Veuillez saisir une quantité valide (entre 1 et 500)";
            errorQuantity.classList.add('error');
            return false;
        }
        else {
            errorQuantity.innerText = '';
            errorQuantity.classList.remove('error');
            return true;
        }
};

quantites.forEach(i =>{
    addEventListener('input',function(){
    validateQuantity(quantites);
});
});

// récuperation de l'id_echange depuis la page echange détails

const idechange = sessionStorage.getItem('currentId');


// preparation des donnéee
let data = {
    idEchange : idechange,
    briques : []
};
// fonction qui permettra la creation des briques de l'échange
function creerBrique(id, quantite) {    
     return {         
        id_brique: id,
        quantite: quantite 
    };
}
btnSubmit.addEventListener('click', async function(){
    if( validateQuantity(inputQuantite)){
        quantites.forEach(quantite =>{
                const valeur = parseInt(quantite.value, 10);
                const id = parseInt(quantite.getAttribute('data-id'));
                let brique = creerBrique(id, valeur);
                data.briques.push(brique)

            });
            if(data.briques.length !== 0){
                const response = await fetch('/api/proposition',{
                    method : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if(response.status === 201){
                    
                    const id = 
                    window.location.href = '/proposition/'+id ;  
        
                }
            }
    }
})