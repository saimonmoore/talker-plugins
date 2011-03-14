plugin.onMessageSend = function (event) {
  if ((new Date()).getDate() === 14) {
    if ((event.content.match(/^([a-z]+)$/) || [false])[0]) {
      alert('Y U NO UZ CAPSLOCK?');
    }
    Talker.sendMessage(event.content.toUpperCase());
    Talker.getMessageBox().val('');
    return false;
  }
  else {
    return true;
  }
};
