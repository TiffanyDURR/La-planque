function sendMessagePacket(message, color) {
  let packet = new Object();
  packet.command = "SEND_MESSAGE";
  packet.message = message;
  packet.color = color;
  return packet;
}

function connectPacket(username) {
  let packet = new Object();
  packet.username = username;
  packet.command = "CONNECT";
  return packet;
}
