const containerMessage = document.querySelector('main');

nameOfUser();
function nameOfUser() {
     const localUser = prompt('Qual o seu nome ?');
     const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ' , {name: localUser});
     promise.then(showMessages);
     promise.catch(errorUser);
     return localUser;
}
 
// setInterval( loadMessages, 3000);
function errorUser(){
    alert('Digite um nome válido');
    nameOfUser();
}

function showMessages(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then((answer) => {
    console.log(answer.data);
    for (let i = 0 ; i < 50 ; i++) {
        if (answer.data[i].type === 'status') {
            containerMessage.innerHTML += `<div class="backgroundColorStatus">
            <p class="time">(${answer.data[i].time})</p>
            <p class="user">${answer.data[i].from} para ${answer.data[i].to}:</p>
            <p class="message">${answer.data[i].text}</p>
            </div>`
        }  if (answer.data[i].type === 'message') {
            containerMessage.innerHTML += `<div class="backgroundColorNormalMessage">
            <p class="time">(${answer.data[i].time})</p>
            <p class="user">${answer.data[i].from} :</p>
            <p class="message">${answer.data[i].text}</p>
            </div>`
        } //if (answer.data[i].to !== 'Todos'){
        //     containerMessage.innerHTML += `<div class="backgroundColorPrivateMessage">
        //     <p class="time">(${answer.data[i].time})</p>
        //     <p class="user">${answer.data[i].from} para ${answer.data[i].to}:</p>
        //     <p class="message">${answer.data[i].text}</p>
        //     </div>`
        // }

        }
    })
}



