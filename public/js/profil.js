// ajout d'un evenement click sur le bouton verifier l'échange dans la page profil
document.querySelectorAll(".btn_voir").forEach(button => {      button.addEventListener("click", function(event) {         
    const id = event.target.getAttribute("data-id");         
    window.location.href= "/echange/"+id;
}); });

// ajout d'un evenement sur le click du boutton effacer
document.querySelectorAll(".btn_effacer").forEach(button => {      
    button.addEventListener("click", function(event) {         
    const id = event.target.getAttribute("data-id");         

        // Envoi de la requête DELETE
        fetch(`/api/echange/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Si la suppression réussit, on peut retirer l'élément de la page
                event.target.closest(".echange").remove();  // Retire l'élément de la liste
            } 
        })
        .catch(error => {
            console.error("Erreur:", error);
            alert("Erreur lors de la suppression de l'échange.");
        });
  

});

});


