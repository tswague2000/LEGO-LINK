const inputNom = document.getElementById('last-name');
const inputPrenom = document.getElementById('first-name');
const inputEmail = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');
const toggleIcon = document.getElementById('toggleIcon');
const smallMail = document.getElementById('smallMail');
const smallPassword = document.getElementById('smallPassword');
const formulaire = document.getElementById('loginForm');
const authError = document.getElementById('auth-error');
const focusIcon = document.getElementById('envelope');

// ****************ajout d'un focus après sur l'icon de l'email*****
focusIcon.addEventListener('click',function(){
    inputEmail.focus();
});


// ********* Validation de l'email ***********
const valideEmail = (inputEmail) => {
    const emailRegEx = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-z]{2,10}$/;
    const testEmail = emailRegEx.test(inputEmail.value.trim());

    if (!inputEmail.value.trim()) {
        smallMail.innerText = 'Veuillez saisir votre adresse courriel.';
        smallMail.classList.add('error');
        return false;
    }
    if (!testEmail) {
        smallMail.innerText = 'Veuillez saisir une adresse email valide.';
        smallMail.classList.add('error');
        return false;
    }
    smallMail.innerText = '';
    smallMail.classList.remove('error');
    return true;
};

inputEmail.addEventListener('input', function () {
    valideEmail(this);
});

// ********** Validation du mot de passe ***********
const validePassword = (inputPassword) => {
    const password = inputPassword.value.trim();

    if (!password) {
        smallPassword.innerText = 'Veuillez saisir votre mot de passe.';
        smallPassword.classList.add('error');
        inputPassword.classList.add('border-error');
        return false;
    }
    if (password.length < 5) {
        smallPassword.innerText = 'Le mot de passe doit contenir au moins 5 caractères.';
        smallPassword.classList.add('error');
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        smallPassword.innerText = 'Le mot de passe doit contenir au moins une majuscule.';
        smallPassword.classList.add('error');
        return false;
    }
    if (!/[a-z]/.test(password)) {
        smallPassword.innerText = 'Le mot de passe doit contenir au moins une minuscule.';
        smallPassword.classList.add('error');
        return false;
    }
    if (!/[0-9]/.test(password)) {
        smallPassword.innerText = 'Le mot de passe doit contenir au moins un chiffre.';
        smallPassword.classList.add('error');
        return false;
    }
    smallPassword.innerText = '';
    smallPassword.classList.remove('error');
    return true;
};

inputPassword.addEventListener('input', function () {
    validePassword(this);
});

// ****** Affichage/Masquage du mot de passe ******
toggleIcon.addEventListener('click', () => {
    const isPasswordVisible = inputPassword.type === 'text';
    inputPassword.type = isPasswordVisible ? 'password' : 'text';
    toggleIcon.classList.toggle('fa-eye');
    toggleIcon.classList.toggle('fa-eye-slash');
    inputPassword.focus();
});

// ********** Validation du prénom ***********
const validerPrenom = (inputPrenom) => {
    const prenomRegEx = /^[A-Za-zÀ-ÿ]+(?:[- ][A-Za-zÀ-ÿ]+)*$/;
    const smallPrenom = document.getElementById('small-firstName');
    const prenom = inputPrenom.value.trim();

    if (!prenom) {
        smallPrenom.innerText = 'Veuillez saisir votre prénom.';
        smallPrenom.classList.add('error');
        return false;
    }
    if (!prenomRegEx.test(prenom)) {
        smallPrenom.innerText = 'Veuillez saisir un prénom valide (ex: halimatou , thierno souleymane).';
        smallPrenom.classList.add('error');
        return false;
    }
    smallPrenom.innerText = '';
    smallPrenom.classList.remove('error');
    return true;
};

inputPrenom.addEventListener('input', function () {
    validerPrenom(this);
});

// ********** Validation du nom ***********
const validerNom = (inputNom) => {
    const smallNom = document.getElementById('small-lastName');
    const nom = inputNom.value.trim();

    if (!nom) {
        smallNom.innerText = 'Veuillez saisir un nom.';
        smallNom.classList.add('error');
        return false;
    }
    if (nom.length < 2) {
        smallNom.innerText = 'Le nom doit contenir au moins 2 caractères.';
        smallNom.classList.add('error');
        return false;
    }
    if (nom.length > 30) {
        smallNom.innerText = 'Le nom doit contenir au maximum 30 caractères.';
        smallNom.classList.add('error');
        return false;
    }
    smallNom.innerText = '';
    smallNom.classList.remove('error');
    return true;
};

inputNom.addEventListener('input', function () {
    validerNom(this);
});

// ********** Ajout d'un nouvel utilisateur après validation ***********
formulaire.addEventListener('submit', async (event) => {
    event.preventDefault();

    const isEmailValid = valideEmail(inputEmail);
    const isPasswordValid = validePassword(inputPassword);
    const isPrenomValid = validerPrenom(inputPrenom);
    const isNomValid = validerNom(inputNom);

        if (!isEmailValid || !isPasswordValid || !isPrenomValid || !isNomValid) {
            return;      
          } 
        else{

        
    // preparation des données 
    const data = {
        courriel : inputEmail.value,
        nom : inputNom.value,
        prenom : inputPrenom.value,
        motdepasse : inputPassword.value
    };

    // envoi de la requête
    const response = await fetch('/api/user',{
        method : 'POSt',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(data)
    });

    if(response.ok){
        location.href = '/api/connexion'
    }
    else if(response.status === 409) {
        authError.innerText = 'Un compte avec cette adresse courriel existe déjà.';
        authError.classList.add('error');
    }

}
});
