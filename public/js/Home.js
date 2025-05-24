// déclarations des variables constantes html
const btnCreateExchange = document.getElementById('btn-createExchange');
const iconProfil = document.getElementById('logo-link');
const btnVerifyExchange = document.getElementById('btn_verifyExchange');
const btnLogin = document.getElementById('btn-connexion');


// ajout d'un evenement click sur le logo de la page d'accueil
iconProfil.addEventListener('click',function(){
    window.location.href='/';
});

// ajout d'un evenement click sur le bouton verifier l'échange dans la page d'accueil 
document.querySelectorAll(".btn_voir").forEach(button => {   button.addEventListener("click", function(event) {         
    const id = event.target.getAttribute("data-id");         
    window.location.href= "/echange/"+id;
}); });


