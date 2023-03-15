const messageInputs = document.querySelectorAll(".message-inputs");
const form = document.querySelector(".msg");
let sendButton = document.getElementById("submit");
let message;

const pseudoInputs = document.querySelectorAll(".pseudo-inputs");
const form2 = document.querySelector(".pseudo");
let valider = document.getElementById("valider");
let pseudo;

function scrollToBottom() {
  let boitechat = document.getElementById("boitechat");
  boitechat.scrollTop = boitechat.scrollHeight;
}

let erreur = document.querySelector(".chatbox-error");
let titrePseudo = document.querySelector(".titre-pseudo");

pseudoInputs.forEach((pseud) => {
  pseud.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

const pseudoChecker = (value) => {
  const pseudoContainer = document.querySelector(".pseudo-container");
  let errorDisplay = document.querySelector(".pseudo-container > .error");
  if (value.length > 0 && (value.length < 3 || value.length > 18)) {
    pseudoContainer.classList.add("error");
    errorDisplay.textContent = "Votre pseudo doit faire entre 3 et 18 caractères.";
    pseudo = null;
  } else {
    pseudoContainer.classList.remove("error");
    errorDisplay.textContent = "";
    pseudo = value;
  }
};

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  if (pseudo) {
    const data = {
      pseudo,
    };
    form2.style.display = "none";
    titrePseudo.innerHTML = `<span class="connectedas">Tu es connecté(e) en tant que <span class="pseudal">${pseudo}</span></span>`;
  }
});

messageInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "message":
        messageChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

const messageChecker = (value) => {
  const messageContainer = document.querySelector(".message-container");
  let errorDisplay = document.querySelector(".message-container > .error");
  if (value.length > 0 && (value.length < 2 || value.length > 480)) {
    messageContainer.classList.add("error");
    errorDisplay.textContent = "Votre message doit faire entre 2 et 480 caractères.";
    message = null;
  } else {
    messageContainer.classList.remove("error");
    errorDisplay.textContent = "";
    message = value;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (message) {
    const data = {
      message,
    };

    document.querySelector(".chatbox").innerHTML += ` 
     <div class="message-envoye"> <span class="pseudo-chat">${pseudo}</span> : ${message}</div>
    `;
    messageInputs.forEach((input) => (input.value = ""));
    message = null;
    scrollToBottom();
  }
  if (pseudo == "" || pseudo == null) {
    document.querySelector(".chatbox").innerHTML = ` 
     <div class="indiquer-pseudo">Attention, il est obligatoire d'indiquer un pseudo !</div>
    `;
  }
});

let pseudoChat = document.querySelectorAll(".pseudo-chat");

pseudoChat.forEach((pseudal) => {
  pseudal.style.color = "grey";
});
