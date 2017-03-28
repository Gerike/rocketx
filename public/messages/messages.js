'use strict';
let messages = [];

function _getUserMessages() {
  _getUserSentMessages();
  _getUserReceivedMessages();
}

function _getUserSentMessages() {
  $.ajax({
    url: '/messages/sent_messages',
    method: 'GET',
    success: data => _loadMessages(data.messages.map((message) => {
      message.type = "sent";
      return message;
    }))
  });
}

function _getUserReceivedMessages() {
  $.ajax({
    url: '/messages/received_messages',
    method: 'GET',
    success: data => _loadMessages(data.messages.map((message) => {
      message.type = "received";
      return message;
    }))
  });
}

function _markMessageAsRead(message) {
  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    jqXHR.setRequestHeader('csrf-token', csrfToken);
  });
  $.ajax({
    url: '/messages/mark_as_read',
    method: 'POST',
    data: {id: message.id},
    success: () => {
      $(`#message_selector_${message.id}`).removeClass('unread');
    }
  });
}

function _loadMessages(newMessages) {
  messages = messages.filter(message => message.type !== newMessages[0].type).concat(newMessages);
  messages.sort((a, b) => a.id < b.id);

  const messagesSelector = $('#messages_selector');
  messagesSelector.empty();
  messages.forEach(message => messagesSelector.append(_createMessageSelector(message)));
}

function _createMessageSelector(message) {
  let previewLine = _getMessagePreviewLine(message.content);
  let messageSelector = $(`<div id="message_selector_${message.id}" class="message_selector"><span class="message_selector_title">${message.title}</span><span class="message_selector_date">${message.sent}</span><span class="message_selector_preview">${previewLine}</span></div>`);
  if (message.type === 'received' && message.unread)
    messageSelector.addClass('unread');

  messageSelector.on('click', () => {
    $('.selected_message').removeClass('selected_message');
    messageSelector.addClass('selected_message');
    _showMessage(message);
  });
  return messageSelector;

}

function _getMessagePreviewLine(content) {
  content = $(`<p>${content}</p>`).text();
  if (content.length <= 40)
    return content;
  else
    return content.slice(0, 37) + '...';
}

function _showMessage(message) {
  if (message.unread && message.type === 'received')
    _markMessageAsRead(message);

  $('#message_content').html(`Sender: ${message.sender}<br><br>${message.content}`);
}

_getUserMessages();
