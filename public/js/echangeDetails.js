//a ajout d'evenemt click pour aller vers la page create proposition avec son data id
const btnProposition = document.querySelectorAll('.proposition');

btnProposition.forEach(button => {
    button.addEventListener('click', function (event) {
        const id = event.target.getAttribute("data-id");
        // console.log(id)
        // if (!id) {
        //     console.error("ID manquant pour ce bouton");
        //     return;
        // }
        // sessionStorage.setItem('currentId', id);
        window.location.href = "/proposition";
    });
    
});


// ajout d'un évenement click sur le boutton voir proposition

const btnVoirProposition = document.querySelectorAll('.voir-proposition');

btnVoirProposition.forEach(button => {
    button.addEventListener('click', function (event) {
        const id = event.target.getAttribute("data-id");
      
        window.location.href = "/viewProposition";
    });
    
});






