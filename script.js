const containerMessage = document.querySelector('main');
const screen = document.querySelector('.screen-user');
let localUser;

function nameOfUser() {
    const button = document.querySelector('.button');
    const warning = document.querySelector('.warning');
    warning.innerHTML = '';
    button.classList.add('loading');
    button.innerHTML = 'Entrando ...';
    const input = document.querySelector('.nameUser');
    localUser = input.value;
    input.value = '';
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ' , {name: localUser});
    promise.then( () => {
        screen.classList.add('hide')
        setInterval(verifyStatusOfUser , 5000);
        setInterval(updateUsers , 10000);
    });
    promise.catch(errorUser);
}
setInterval(showMessages , 3000);

document.addEventListener('keydown' , (event) => {
    if (event.key === 'Enter' && screen.classList.contains('hide') === false) {
        nameOfUser();
    } else if (event.key === 'Enter') {
        sendMessage();
    }
})
function errorUser(error){
    const warning = document.querySelector('.warning');
    const button = document.querySelector('.button');
    button.innerHTML = 'Entrar';
    button.classList.remove('loading');
    if (error.response.status === 400) {
        warning.innerHTML = 'Nome de usuário já em uso </br> Digite outro nome';
    }
    warning.classList.remove('hide');
}

function showMessages(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then((answer) => {
    containerMessage.innerHTML = '';
    for (let i = answer.data.length - 1 ; i >= 60 ; i--) {
        if (answer.data[i].type === 'status') {
            containerMessage.innerHTML += `<div class="backgroundColorStatus">
            <span class="time">(${answer.data[i].time})</span>
            <span class="user"><strong>${answer.data[i].from}</strong> para <strong>${answer.data[i].to}:</strong></span>
            <span class="message">${answer.data[i].text}</span>
        </div>`
        }  if (answer.data[i].type === 'message') {
            containerMessage.innerHTML += `<div class="backgroundColorNormalMessage">
            <span class="time">(${answer.data[i].time})</span>
            <span class="user"><strong>${answer.data[i].from}</strong> para <strong>${answer.data[i].to}:</strong></span>
            <span class="message">${answer.data[i].text}</span>
        </div>`
        } if (answer.data[i].type === 'private_message' && answer.data[i].to == localUser) {
            containerMessage.innerHTML += `<div class="backgroundColorPrivateMessage">
            <span class="time">(${answer.data[i].time})</span>
            <span class="user"><strong>${answer.data[i].from}</strong> para <strong>${localUser}:</strong></span>
            <span class="message">${answer.data[i].text}</span>
        </div>`
        }
      }
      const lastElement = document.querySelector('main div:first-child');
      lastElement.scrollIntoView(false);
    })
    promise.catch( (error) => console.log(error));
    console.log('mensagens atualizadas');
}
function sendMessage() {
    const input = document.querySelector('.input-send');
    const messageOfUser = input.value;
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',{
        from: localUser,
        to: 'Todos',
        text: messageOfUser,
        type: 'message'
    })
    input.value = '';
    promise.then( (answer) => {
        showMessages();
    });
    promise.catch((erro) => {
    console.log(erro); 
    window.location.reload()}); 
}

function verifyStatusOfUser(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status' , {name: localUser});
}
function toggleSideBar(){
    const sideBar = document.querySelector('.side-bar');
    const nav = document.querySelector('nav');
    sideBar.classList.toggle('hide');
    nav.classList.toggle('hide');
}
function updateUsers(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(showUsersSideBar);
}
function showUsersSideBar(answer){
    const users = document.querySelector('.usersUpdate');
    users.innerHTML = '';
    for (let i = 0 ; i < answer.data.length ; i++) {
        users.innerHTML += 
    `<div onclick="selectUser(this)">
        <ion-icon name="person-circle" class="icon"></ion-icon>
        ${answer.data[i].name}
        <ion-icon name="checkmark-sharp" class="check hide"></ion-icon>
    </div>`
    }
}
function selectUser(e){
    const icon = e.querySelector('.check');
    const users = document.querySelector('.users');
    const icons = users.querySelectorAll('.check');
    for (let i = 0 ; i < icons.length ; i++) {
        icons[i].classList.add('hide');
    }
    icon.classList.remove('hide');
}
function selectVisiblity(e) {
    const visibity = e.querySelector('.check')
    visibity.classList.remove('hide');
}



