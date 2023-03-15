function handleMessage(packet) {
  let now = new Date();
  let heure = now.getHours();
  let minute = now.getMinutes();
  let seconde = now.getSeconds();
  if (seconde < 10 || heure < 10 || minute < 10) {
    seconde = "0" + seconde;
  }
  chatBox.innerHTML += ` <div class="message-envoye"> <span class="timestamp">${heure}:${minute}:${seconde}</span><span class="pseudo-chat">${packet.from}</span> : ${packet.message}</div>`;
}

function handleConnect(packet) {
     let users = packet.users;
     users.forEach((user) => {
       userList.innerHTML += `<li id="${user}"><span>${user}</span></li>`;
     });
}

function userLeft(packet) {
    let itemUser = document.getElementById(packet.username);

    itemUser.innerHTML = "";
}

function userConnected(packet) {

}
