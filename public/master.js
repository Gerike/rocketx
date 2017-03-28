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
});


function _createNotification(type, text) {
  let icon;
  switch (type) {
    case 'error':
      icon = '<i class="fa fa-2x fa-times" aria-hidden="true"></i>';
      break;
    case 'info':
      icon = '<i class="fa fa-2x fa-info" aria-hidden="true"></i>';
      break;
    case 'warning':
      icon = '<i class="fa fa-2x fa fa-exclamation" aria-hidden="true"></i>';
      break;
  }

  const notificationWrapper = $('#_notification_wrapper');
  const notification = $(`<div class="_notification _notification_${type} _no_select"></div>`);
  notification.append($(`<div class="_notification_icon _no_select">${icon}</div>`));
  notification.append($(`<div class="_notification_text _no_select">${text}</div>`));
  notificationWrapper.append(notification);
  notification.fadeIn();
  setTimeout(() => {
    notification.fadeOut('slow', () => {
      notification.remove();
    });
  }, 4000);
}

