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
      writeConsole("Connecté au serveur");
    };

    ws.onmessage = function (e) {
      onMessage(e);
    };

    ws.onclose = function () {
      writeConsole("Connexion fermée");
    };
    ws.onerror = function (e) {
      writeConsole("Une erreur est survenue" + e);
    };
  }
}

function onMessage(event) {
  if (event.data != null) {
    writeConsole("Message reçu..." + event.data);
    let packet = JSON.parse(event.data);

    if (packet.command == "MESSAGE_RECEIVED") {
      handleMessage(packet);
    } else if (packet.command == "CONNECT") {
      handleConnect(packet);
    } else if (packet.command == "USER_LEFT") {
      handleUserLeft(packet);
    } else if (packet.command == "USER_CONNECTED") {
      handleUserConnected(packet);
    } else {
      writeConsole("Commande non reconnue");
    }
    scrollToBottom();
  }
}

function writeConsole(message) {
  consoleContainer.innerHTML += `<li>${message}</li>`;
}

function sendPacket(packet) {
  packet = JSON.stringify(packet);
  writeConsole(`Envoi : ${packet}`);
  ws.send(packet);
}

envoyerBTN.addEventListener("click", (e) => {
  e.preventDefault();
  let colorInput = document.getElementById("colorpicker");
  let colorValue = colorInput.value;
  console.log(colorValue);

  let packet = sendMessagePacket(message.value, colorValue);
  sendPacket(packet);
  messageInput.value = "";
});
