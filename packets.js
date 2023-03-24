function sendMessagePacket(message, color) {
  let packet = new Object();
  packet.command = "SEND_MESSAGE";
  packet.message = message;
  packet.color = color;
  return packet;
}

function connectPacket(username) {
  let packet = new Object();
  packet.command = "CONNECT";
  packet.username = username;
  return packet;
}

function isTypingPacket() {
  let packet = new Object();
  packet.command = "IS_TYPING";
  return packet;
}

function statusPacket(status) {
  let packet = new Object();
  packet.command = "STATUS_UPDATE";
  packet.status = status;
  return packet;
}