function handleMessage(packet) {
  let now = new Date();
  let heure = now.getHours();
  let minute = now.getMinutes();
  let seconde = now.getSeconds();
  if (seconde < 10) {
    seconde = "0" + seconde;
  }
  if (heure < 10) {
    heure = "0" + heure;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  chatBox.innerHTML += ` <div class="message-envoye"> <span class="timestamp">${heure}:${minute}:${seconde}</span><span class="pseudo-chat" style="color:${packet.color}">${packet.from}</span> : ${packet.message}</div>`;

  if (document.hidden) {
    missedMessages++;
    document.title = `(${missedMessages}) Nouveaux message(s)`;
  }
}

function handleConnect(packet) {
  let users = packet.users;
  users.forEach((user) => {
    userList.innerHTML += `<li id="${user}"><span>${user}</span></li>`;
  });
}

function handleUserLeft(packet) {
  let itemUser = document.getElementById(packet.username);
  itemUser.remove();
}

function handleUserConnected(packet) {
  userList.innerHTML += `<li id="${packet.username}"><span>${packet.username}</span></li>`;
}
