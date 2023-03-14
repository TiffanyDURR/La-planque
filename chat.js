let consoleContainer = document.querySelector(".console");
const seConnecterBTN = document.getElementById("valider");
const envoyerBTN = document.getElementById("submit");
const messageInput = document.getElementById("message");

let ws = new WebSocket("ws://212.198.179.227:27350/", ["osef"]);

const songs = [
  {
    nom: "Tryixouille l'andouille",
    prenom: "Claffouti",
    age: 74,
    infos: ["gris", "bleu", "vert"],
  },
];

function connectToServer() {
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

seConnecterBTN.addEventListener("click", () => {
  connectToServer();
});

function readConsole(message) {
  consoleContainer.innerHTML += `<li>${message}</li>`;
}

function sendMessage(message) {
  readConsole(`Envoi : ${message}`);
  ws.send(message);
}

envoyerBTN.addEventListener("click", () => {
  sendMessage(messageInput.value);
});
