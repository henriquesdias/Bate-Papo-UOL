const containerMessage = document.querySelector('.container-message');

function nameOfUser() {
    let localUser = prompt('Qual o seu nome ?');
    registerUser();
}
function registerUser() {
    let url = 'https://mock-api.driven.com.br/api/v6/uol/participants';
    fazPost(url , {name : localUser});
}
