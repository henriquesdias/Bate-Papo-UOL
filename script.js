const containerMessage = document.querySelector('main');
const message = document.querySelector('.message');
let localUser;
nameOfUser();
function nameOfUser() {
     localUser = prompt('Qual o seu nome ?');
     const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ' , {name: localUser});
     promise.then(showMessages);
     promise.catch(errorUser);
     return localUser;
}
 
function errorUser(){
    alert('Digite um nome válido');
    nameOfUser();
}

function showMessages(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then((answer) => {
    for (let i = 0 ; i < answer.data.length ; i++) {
        if (answer.data[i].type === 'status') {
            containerMessage.innerHTML += `<div class="backgroundColorStatus message">
            <p class="time">(${answer.data[i].time})</p>
            <p class="user">${answer.data[i].from} para ${answer.data[i].to}:</p>
            <p class="message">${answer.data[i].text}</p>
            </div>`
        }  if (answer.data[i].type === 'message') {
            containerMessage.innerHTML += `<div class="backgroundColorNormalMessage message">
            <p class="time">(${answer.data[i].time})</p>
            <p class="user">${answer.data[i].from} para ${answer.data[i].to} :</p>
            <p class="message">${answer.data[i].text}</p>
            </div>`
        } 
      }
    })
}
function sendMessage() {
    const input = document.querySelector('.input-send');
    const message = input.value;
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',{
        from: localUser,
        to: 'Todos',
        text: message,
        type: 'message'
    })
    input.value = '';
    promise.then( (answer)=> {
        console.log(`Deu certo o envio de mensagem ${answer}`);
        containerMessage.innerHTML = '';
        showMessages();
        message.scrollIntoView();
    });
    promise.catch((erro) => {
    console.log(erro); 
    alert('Deu ruim') }); 
}



