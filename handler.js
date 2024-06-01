const handlers = {
"MESSAGE_RECEIVED" : handleMessage,
"CONNECT" : handleConnect,
"USER_LEFT" : handleUserLeft,
"USER_CONNECTED" : handleUserConnected,
"IS_TYPING" : handleIsTyping,
"STATUS_UPDATE" : handleStatusUpdate
}

function handleMessage(packet) {
  var message = buildMessage(packet.message);

  chatBox.innerHTML += ` <div class="message-envoye"> <span class="timestamp">${buildTimeStamp()}</span><span class="pseudo-chat" style="color:${packet.color}">${packet.from}</span> : ${message}</div>`;

  if (document.hidden) {
    missedMessages++;
    document.title = `(${missedMessages}) ${originalTitle}`;
  }
}

function handleConnect(packet) {
  let users = packet.users;
  users.forEach((user) => {
    userList.innerHTML += `<li id="${user}"><i class="fas fa-circle"></i><span>${user}</span> <i class="fas fa-pen"></i></li>`;
  });
}

function handleUserLeft(packet) {
  let itemUser = document.getElementById(packet.username);
  chatBox.innerHTML += ` <div class="message-envoye"> <span class="timestamp">${buildTimeStamp()}</span>${packet.username} s'est déconnecté.</div>`;
  itemUser.remove();
}

function handleUserConnected(packet) {
  chatBox.innerHTML += ` <div class="message-envoye"> <span class="timestamp">${buildTimeStamp()}</span>${packet.username} vient de se connecter.</div>`;
  userList.innerHTML += `<li id="${packet.username}"><i class="fas fa-circle"></i><span>${packet.username}</span> <i class="fas fa-pen"></i></li>`;
}

function handleIsTyping(packet) {
  let itemUser = document.getElementById(packet.username);
  let iconsTyping = document.querySelectorAll(`li#${packet.username} i.fas.fa-pen`);

  iconsTyping.forEach((iconsTyping) => {
    iconsTyping.style.display = "block";

    if (typingTimer != null) {
      window.clearTimeout(typingTimer);
    }
    typingTimer = setTimeout(finishTyping, 6000, iconsTyping);
  });
}

function handleStatusUpdate(packet) {
  let itemUser = document.getElementById(packet.username);
  let iconsOnline = document.querySelectorAll(`li#${packet.username} i.fas.fa-circle`);
  console.log(itemUser);

  if (packet.status == 1) {
    iconsOnline.forEach((iconOnline) => {
      iconOnline.style.color = "green";
    });
  } else if (packet.status == 2) {
    iconsOnline.forEach((iconOnline) => {
      iconOnline.style.color = "red";
    });
  }
}
