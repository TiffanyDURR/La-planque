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