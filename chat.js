let consoleContainer = document.querySelector(".console");
const seConnecterBTN = document.getElementById("valider");
const envoyerBTN = document.getElementById("submit");
const messageInput = document.getElementById("message");
const pseudoInput = document.getElementById("pseudo");
const chatBox = document.querySelector(".chatbox");
const userList = document.querySelector(".users");
let checkColor = document.querySelector(".valider-color");
let colorView = document.querySelector(".colorshow");
let originalTitle = document.title;
let missedMessages = 0;

// Events / Listeners
document.addEventListener("visibilitychange", visibilityChanged);
seConnecterBTN.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

envoyerBTN.addEventListener("click", (e) => {
  let colorInput = document.getElementById("colorpicker");
  let colorValue = colorInput.value;

  e.preventDefault();
  let packet = sendMessagePacket(message.value, colorValue);
  sendPacket(packet);
  messageInput.value = "";
});

checkColor.addEventListener("click", () => {
  let colorInput = document.getElementById("colorpicker");
  let colorValue = colorInput.value;

  localStorage.setItem("COLORTEXT", colorValue);
  colorView.style.background = colorValue;
  console.log(colorView);
});

function init() {
  connectToServer();
  let colorInput = document.getElementById("colorpicker");
  let savedColor = localStorage.getItem("COLORTEXT");

  if (savedColor == null) {
    savedColor = "#f18d5c";
  }

  colorInput.value = savedColor;
  colorView.style.background = savedColor;
}

let ws = null;

init();

function login() {
  let pseudo = pseudoInput.value;
  let packet = connectPacket(pseudo);
  sendPacket(packet);
}

function visibilityChanged() {
  if (!document.hidden) {
    document.title = originalTitle;
    missedMessages = 0;
  }
}

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
