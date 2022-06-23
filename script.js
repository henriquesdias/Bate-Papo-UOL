const containerMessage = document.querySelector('main');
const screen = document.querySelector('.screen-user');
let localUser;
// nameOfUser();
function nameOfUser() {
    const input = document.querySelector('.nameUser');
    localUser = input.value;
    // localUser = prompt('Qual o seu nome ?');
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ' , {name: localUser});
    promise.then(showMessages);
    promise.catch(errorUser);
}
 
function errorUser(){
    alert('Digite um nome válido');
    nameOfUser();
}

function showMessages(){
    screen.classList.add('hide');
    containerMessage.innerHTML = '';
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then((answer) => {
    for (let i = 0 ; i < answer.data.length ; i++) {
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
            <p class="user">${answer.data[i].from} para ${answer.data[i].to} :</p>
            <p class="message">${answer.data[i].text}</p>
            </div>`
        }
      }
    })
    // setInterval(showMessages , 3000);
    // setInterval(verifyStatusOfUser , 5000);
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
    promise.then( (answer)=> {
        containerMessage.innerHTML = '';
        showMessages();
    });
    promise.catch((erro) => {
    console.log(erro); 
    window.location.reload()}); 
}
function verifyStatusOfUser(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status' , {name: localUser});
    console.log('estou verificando sua presença');
}



