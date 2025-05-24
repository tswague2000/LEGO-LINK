
// ************Création de middleware pour verifier que l'utilisateur est connecté **********
export function userConnected(request, response, next) {
    if(!request.user) {
        response.status(401).end();
        return;
    }

    next();
};