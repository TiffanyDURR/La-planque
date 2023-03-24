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
  userList.innerHTML += `<li id="${packet.username}"><span>${packet.username}</span></li>`;
}

function handleIsTyping(packet) {
  let itemUser = document.getElementById(packet.username);
  let iconsTyping = document.querySelectorAll(`li#${packet.username} i.fas.fa-pen`);

  iconsTyping.forEach((iconsTyping) => {
    iconsTyping.style.display = "block";
  });

  console.log(packet.username + " is typing ...");
}

function handleStatusUpdate(packet) {
  let itemUser = document.getElementById(packet.username);
  let iconsOnline = document.querySelectorAll(`li#${packet.username} i.fas.fa-circle`);
  console.log(itemUser);

  if (packet.status == 1) {
    iconsOnline.forEach((iconOnline) => {
      iconOnline.style.color = "green";
    });
    console.log(packet.username + " is online");
  } else if (packet.status == 2) {
    console.log(packet.username + " is away");
    iconsOnline.forEach((iconOnline) => {
      iconOnline.style.color = "red";
    });
  }
}
