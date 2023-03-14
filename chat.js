let consoleContainer = document.querySelector(".console");
const seConnecterBTN = document.getElementById("valider");
const envoyerBTN = document.getElementById("submit");
const messageInput = document.getElementById("message");
const pseudoInput = document.getElementById("pseudo");

let ws = null;

function createPacket(command, from, content) {
  let packet = new Object();

  packet.command = command;
  packet.from = from;
  packet.content = content;

  return JSON.stringify(packet);
}

function connectToServer() {

ws = new WebSocket("ws://212.198.179.227:27350/", ["osef"]);

  if ("WebSocket" in window) {
    ws.onopen = function () {
      readConsole("Connecté au serveur");
    };
    ws.onmessage = function (event) {
      readConsole("Message reçu..." + event.data);
    };

    ws.onclose = function () {
      readConsole("Connexion fermée");
    };
    ws.onerror = function (e) {
      readConsole("Une erreur est survenue" + e);
    };
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
}

envoyerBTN.addEventListener("click", (e) => {
  e.preventDefault();

  let packet = createPacket("SEND_MESSAGE", pseudoInput.value, messageInput.value);

  sendMessage(packet);
  messageInput.value = "";
});
