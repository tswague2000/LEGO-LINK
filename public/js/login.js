// recuperation des éléments html
const form = document.getElementById('#loginForm');
const inputEmail = document.getElementById('input-mail');
const inputPassword = document.getElementById('input-password');
const smallMail = document.getElementById('smallMail');
const smallPassword = document.getElementById('smallPassword');
const toggleIcon = document.getElementById('toggleIcon');
const formulaire = document.getElementById('loginForm');
const authError = document.getElementById('auth-error');
const focusIcon = document.getElementById('focus-tb');

// ****************ajout d'un focus après sur l'icon de l'email*****
focusIcon.addEventListener('click',function(){
    inputEmail.focus();
});


// **********creation de la fonction pour validé l'email ***********

const valideEmail = function (inputEmail) {
    let emailRegEx = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
    );
    // test et affichage du texte d'erreur ou de validation
    let testEmail = emailRegEx.test(inputEmail.value);
    if (inputEmail.value === "") {
        smallMail.innerText = 'veuillez saisir votre adresse courriel';
        smallMail.classList.add('error');
        return false;
    } 
        smallMail.innerText = '';
        smallMail.classList.remove('error');
        return true;
    
    
};

// écouter la modification de l'email
inputEmail.addEventListener('input', function () {
    return valideEmail(this);
});

// **********creation de la fonction pour validé le mot de passe ***********

const validePassword = function (inputPassword) {
    if (inputPassword.value === '') {
        smallPassword.innerText = 'veuillez saisir votre mot de passe';
        smallPassword.classList.add('error');
        return false;
    }
    smallPassword.innerText = '';
    smallPassword.classList.remove('error');
    return true;
    
};

// écouter la modification du mot de passe
inputPassword.addEventListener('input', function () {
    return validePassword(this);
});

// ****** ajout d'un affichage ou masquage du mot de passe
toggleIcon.addEventListener('click', () => {
    const isPasswordVisible = inputPassword.type === 'text';

    if (isPasswordVisible) {
        inputPassword.type = 'password';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
        inputPassword.focus();
        return false;
    } else {
        inputPassword.type = 'text';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
        inputPassword.focus();
        return true;
    }
});

///****** authentification d'un utilisateur existant après valisation **********

formulaire.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const isEmailValid = valideEmail(inputEmail);
    const isPasswordValid = validePassword(inputPassword);

    if(!isEmailValid || !isPasswordValid){
        return;
    }
    else{
        // preparation des données
        const data = {
            courriel : inputEmail.value,
            motdepasse : inputPassword.value
        }
        const response = await fetch('/api/connexion',{
            method : 'POST',
            headers : {'Content-Type': 'application/json' },
            body : JSON.stringify(data)
        });
        if(response.ok){
            location.replace('/');
        }
        else if(response.status === 401) {
            const message = await response.json();
            if(message.erreur === 'mauvais_courriel') {
                authError.innerText = 'Un compte avec ce courriel n\'existe pas.';
                authError.classList.add('error');
            }
            else if(message.erreur === 'mauvais_motdepasse') {
                authError.innerText = 'Le mot de passe entré n\'est pas bon.';
                authError.classList.add('error');
            }
        }

    }

})