let emojis = {
  ":D": "😀",
  "=D": "😀",
  ":)": "🙂",
  ";)": "😉",
  ":(": "🙁",
  ":'(": "😢",
  "<3": "❤️",
  ";D": "😜",
  ":o": "😮",
  ":$": "😳",
  ":p": "😛",
  ":@": "😡",
  ":fire:": "🔥",
  ":check:": "✔️",
};

function buildTimeStamp() {
  let now = new Date();
  let heure = now.getHours();
  let minute = now.getMinutes();
  let seconde = now.getSeconds();
  if (seconde < 10) {
    seconde = "0" + seconde;
  }
  if (heure < 10) {
    heure = "0" + heure;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }

  return `${heure}:${minute}:${seconde}`;
}

function buildMessage(rawMessage) {
  let message = replaceURLs(rawMessage);

  message = replaceSmileys(message);

  return message;
}

function replaceURLs(message) {
  if (!message) return;

  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (url) {
    var hyperlink = url;
    if (!hyperlink.match("^https?://")) {
      hyperlink = "http://" + hyperlink;
    }
    if (!isUriImage(hyperlink)) {
      return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + "</a>";
    } else {
      let img = '<img src="' + hyperlink + '">' + "</img>";

      return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + img + "</a>";
    }
  });
}

function replaceSmileys(message) {
  if (!message) return;

  for (const key of Object.keys(emojis)) {
    if (message == key) {
      message = emojis[key];
    } else if (message.includes(" " + key)) {
      message = message.replace(" " + key, " " + emojis[key]);
    } else if (message.includes(key + " ")) {
      message = message.replace(key + " ", emojis[key] + " ");
    }
  }

  return message;
}

const contentTypePart = "image";
const isImage = (url) =>
  new Promise((resolve, reject) => {
    // check that is a valid url
    // then if valid url
    fetch(url)
      .then((response) => {
        if (response.ok) {
          const currentContentType = response.headers.get("Content-Type");
          // check if the content type is actually an image extension
          if (currentContentType.indexOf(contentTypePart) > -1) {
            return resolve(url);
          }
        }
        reject(false);
      })
      .catch(reject);
  });

function isUriImage(uri) {
  uri = uri.split("?")[0];
  var parts = uri.split(".");
  var extension = parts[parts.length - 1];
  var imageTypes = ["jpg", "jpeg", "tiff", "png", "gif", "bmp"];

  if (imageTypes.indexOf(extension) !== -1) {
    return true;
  }
}

function isUriVideo(uri) {
  uri = uri.split("?")[0];
  var parts = uri.split(".");
  var extension = parts[parts.length - 1];
  var videoTypes = ["mp4", "avi"];

  if (videoTypes.indexOf(extension) !== -1) {
    return true;
  }
}
const throttle = (func, delay) => {
  let prev = 0;
  return (...args) => {
    let now = new Date().getTime();

    if (now - prev > delay) {
      prev = now;

      return func(...args);
    }
  };
};
