'use strict';

function _writeUnreadMesssageCounter(count) {
  const messageCounter = $('#_sidebar_unread_message_count');
  const sidebarButton = $('#_open_sidebar_button');

  if (parseInt(count) > 0) {
    messageCounter.html('(' + count + ')');
    messageCounter.parent().addClass('_sidebar_link_important');
  }
  else {
    messageCounter.html('');
    messageCounter.parent().removeClass('_sidebar_link_important');
  }

  sidebarButton.attr('data-notifications', count);
}

function _updateUnreadMessageCounter() {
  $.ajax({
    url: '/messages/unread_count',
    method: 'GET',
    success: data => _writeUnreadMesssageCounter(data.count)
  });
}

$(document).ready(() => {
  _updateUnreadMessageCounter();
  setInterval(() => {
    _updateUnreadMessageCounter();
  }, 10000);
});
