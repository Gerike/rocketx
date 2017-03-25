'use strict';
$(document).ready(() => {
  $('#__login_button').click(e => {
    e.preventDefault();
    let request = $.ajax({
      method: "POST",
      url: "/login",
      data: $('#login_form').serialize(),
    });

    request.fail(data => console.log(data));

    request.done(() => {
      location.reload();
    });
  });

  $('#_sidebar_play').on('click', () => window.location.href = '/play');
  $('#_sidebar_news').on('click', () => window.location.href = '/');
  $('#_open_sidebar_button').on('click', () => _toggleSidebar());
});


function _toggleSidebar() {
  let sideBar = $('#_sidebar');
  let toggleButton = $('#_open_sidebar_button');
  let slideDirection = $(window).width() <= 703 ? 'up' : 'right';

  if (sideBar.is(':visible')) {
    sideBar.hide('slide', {direction: slideDirection}, 600);
    toggleButton.html('<i class="fa fa-bars" aria-hidden="true"></i>');
  }
  else {
    sideBar.show('slide', {direction: slideDirection}, 600);
    toggleButton.html('<i class="fa fa-times" aria-hidden="true"></i>');
  }
}
