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
    promise.then(showMessages);
    promise.catch(errorUser);
}

 
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
    screen.classList.add('hide');
    containerMessage.innerHTML = '';
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then((answer) => {
    for (let i = answer.data.length - 1 ; i >= 60 ; i--) {
        if (answer.data[i].type === 'status') {
            containerMessage.innerHTML += `<div class="backgroundColorStatus">
            <p class="time">(${answer.data[i].time})</p>
            <p class="user">${answer.data[i].from} para ${answer.data[i].to}:</p>
            <p class="message">${answer.data[i].text}</p>
            </div>`
        }  if (answer.data[i].type === 'message') {
            containerMessage.innerHTML += `<div class="backgroundColorNormalMessage">
            <p class="time">(${answer.data[i].time})</p>
            <p class="user">${answer.data[i].from} para ${answer.data[i].to} :</p>
            <p class="message">${answer.data[i].text}</p>
            </div>`
        } if (answer.data[i].type === 'private_message' && answer.data[i].to == localUser) {
            containerMessage.innerHTML += `<div class="backgroundColorPrivateMessage">
            <p class="time">(${answer.data[i].time})</p>
            <p class="user">${answer.data[i].from} para ${localUser} :</p>
            <p class="message">${answer.data[i].text}</p>
            </div>`
        }
      }
      const lastElement = document.querySelector('main div:first-child');
      lastElement.scrollIntoView(false);
    })
    // setInterval(showMessages , 3000);
    setInterval(verifyStatusOfUser , 5000);
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
        console.log(answer);
        containerMessage.innerHTML = '';
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
    const navBar = document.querySelector('nav');
    navBar.classList.toggle('hide');
}
function updateUsers(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(showUsersSideBar);
}
function showUsersSideBar(answer){
    const users = document.querySelector('.usersUpdate');
    console.log(users);
    for (let i = 0 ; i < answer.data.length ; i++) {
        users.innerHTML += 
    `<div>
        <ion-icon name="person-circle" class="icon"></ion-icon>
        ${answer.data[i].name}
        <ion-icon name="checkmark-sharp" class="check hide"></ion-icon>
    </div>`
    }
}



