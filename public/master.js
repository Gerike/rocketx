'use strict';
$(document).ready(() => {
  $('#__login_button').click(e => {
    e.preventDefault();
    let request = $.ajax({
      method: "POST",
      url: "/login",
      data: $('#login_form').serialize(),
    });
    request.fail(data => _createNotification('error', data.statusText + ': ' + data.responseText));
    request.done(() => {
      location.reload();
    });
  });

  $('#_sidebar_play').on('click', () => window.location.href = '/play');
  $('#_sidebar_news').on('click', () => window.location.href = '/');
  $('#_sidebar_logout').on('click', () => window.location.href = '/logout');
  $('#_open_sidebar_button').on('click', () => _toggleSidebar());

  _updateUnreadMessageCounter();
  setInterval(() => {
    _updateUnreadMessageCounter();
  }, 10000);
});


function _toggleSidebar() {
  let sideBar = $('#_sidebar');
  let toggleButton = $('#_open_sidebar_button');
  let slideDirection = $(window).width() <= 703 ? 'up' : 'right';

  if (sideBar.is(':visible')) {
    sideBar.hide('slide', {direction: slideDirection}, 600);
    toggleButton.html('<i class="fa fa-bars" aria-hidden="true"></i>');
    toggleButton.removeClass('_transparent_after');
  }
  else {
    sideBar.show('slide', {direction: slideDirection}, 600);
    toggleButton.html('<i class="fa fa-times" aria-hidden="true"></i>');
    toggleButton.addClass('_transparent_after');
  }
}

function _createNotification(type, text) {
  let icon;
  switch (type) {
    case 'error':
      icon = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
      break;
    case 'info':
      icon = '<i class="fa fa-info-circle" aria-hidden="true"></i>';
      break;
    case 'warning':
      icon = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>';
      break;
  }

  const notificationWrapper = $('#_notification_wrapper');
  const notification = $('<div class="_notification _notification_' + type + '">' + '</div>');
  notification.append($('<div class="_notification_icon">' + icon + '</div>'));
  notification.append($('<div class="_notification_text">' + text + '</div>'));
  notificationWrapper.append(notification);
  notification.fadeIn();
  setTimeout(() => {
    notification.fadeOut('slow', () => {
      notification.remove();
    });
  }, 4000);
}

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
