let consoleContainer = document.querySelector(".console");
const seConnecterBTN = document.getElementById("valider");
const envoyerBTN = document.getElementById("submit");
const messageInput = document.getElementById("message");
const pseudoInput = document.getElementById("pseudo");
const chatBox = document.querySelector(".chatbox");

let ws = null;

function createPacket(command, from, content) {
  let packet = new Object();

  packet.command = command;
  packet.from = from;
  packet.content = content;

  return JSON.stringify(packet);
}

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
      chatBox.innerHTML += `
<div class="message-envoye"> <span class="pseudo-chat">${packet.from}</span> : ${packet.content}</div>`;
    } else {
      readConsole("Packet non reçu");
    }
  }
}

seConnecterBTN.addEventListener("click", (e) => {
  e.preventDefault();
  connectToServer();
});

function readConsole(message) {
  consoleContainer.innerHTML += `<li>${message}</li>`;
}

function sendMessage(message) {
  readConsole(`Envoi : ${message}`);
  ws.send(message);
  scrollToBottom();
}

envoyerBTN.addEventListener("click", (e) => {
  e.preventDefault();

  let packet = createPacket("SEND_MESSAGE", pseudoInput.value, messageInput.value);

  sendMessage(packet);
  messageInput.value = "";
});
