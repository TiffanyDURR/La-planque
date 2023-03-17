function buildTimeStamp(){
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


function replaceURLs(message) {
  if (!message) return;

  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (url) {
    var hyperlink = url;
    if (!hyperlink.match("^https?://")) {
      hyperlink = "http://" + hyperlink;
    }
    return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + "</a>";
  });
}

function replaceURLs(message) {
  if (!message) return;

  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (url) {
    var hyperlink = url;
    if (!hyperlink.match("^https?://")) {
      hyperlink = "http://" + hyperlink;
    }
    return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + "</a>";
  });
}