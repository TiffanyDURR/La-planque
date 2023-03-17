function handleMessage(packet) {

  var message = replaceURLs(packet.message);

  chatBox.innerHTML += ` <div class="message-envoye"> <span class="timestamp">${buildTimeStamp()}</span><span class="pseudo-chat" style="color:${packet.color}">${packet.from}</span> : ${message}</div>`;

  if (document.hidden) {
    missedMessages++;
    document.title = `(${missedMessages}) ${originalTitle}`;
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
  chatBox.innerHTML += ` <div class="message-envoye"> <span class="timestamp">${buildTimeStamp()}</span>${packet.username} s'est déconnecté.</div>`;
  itemUser.remove();
}

function handleUserConnected(packet) {
  chatBox.innerHTML += ` <div class="message-envoye"> <span class="timestamp">${buildTimeStamp()}</span>${packet.username} vient de se connecter.</div>`;
  userList.innerHTML += `<li id="${packet.username}"><span>${packet.username}</span></li>`;
}
