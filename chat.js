let consoleContainer = document.querySelector(".console");
const seConnecterBTN = document.getElementById("valider");
const envoyerBTN = document.getElementById("submit");
const messageInput = document.getElementById("message");
const pseudoInput = document.getElementById("pseudo");
const chatBox = document.querySelector(".chatbox");
const userList = document.querySelector(".users");

let ws = null;

connectToServer();

function login() {
  let pseudo = pseudoInput.value;
  let packet = connectPacket(pseudo);
  sendPacket(packet);
}

seConnecterBTN.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

function connectToServer() {
  ws = new WebSocket("ws://212.198.179.227:27350/", ["osef"]);

  if ("WebSocket" in window) {
    ws.onopen = function () {
      readConsole("Connecté au serveur");
    };

    ws.onmessage = function (e) {
      onMessage(e);
    };

    ws.onclose = function () {
      readConsole("Connexion fermée");
    };
    ws.onerror = function (e) {
      readConsole("Une erreur est survenue" + e);
    };
  }
}

function onMessage(event) {
  if (event.data != null) {
    readConsole("Message reçu..." + event.data);
    let packet = JSON.parse(event.data);

    if (packet.command == "MESSAGE_RECEIVED") {
      let now = new Date();
      let heure = now.getHours();
      let minute = now.getMinutes();
      let seconde = now.getSeconds();
      if (seconde < 10 || heure < 10 || minute < 10) {
        seconde = "0" + seconde;
      }
      chatBox.innerHTML += `
<div class="message-envoye"> <span class="timestamp">${heure}:${minute}:${seconde}</span><span class="pseudo-chat">${packet.from}</span> : ${packet.message}</div>`;
    } else if (packet.command == "CONNECT") {
      let users = packet.users;
      users.forEach((user) => {
        userList.innerHTML += `<li><span>${user}</span></li>`;
      });
    } else {
      readConsole("Packet non reçu");
    }
    scrollToBottom();
  }
}

function readConsole(message) {
  consoleContainer.innerHTML += `<li>${message}</li>`;
}

function sendPacket(packet) {
  packet = JSON.stringify(packet);
  readConsole(`Envoi : ${packet}`);
  ws.send(packet);
}

envoyerBTN.addEventListener("click", (e) => {
  e.preventDefault();
  let packet = sendMessagePacket(message.value, "#000000");
  sendPacket(packet);
  messageInput.value = "";
});
