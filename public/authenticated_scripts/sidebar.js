'use strict';

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

$(document).ready(() => {
  $('#_open_sidebar_button').on('click', () => _toggleSidebar());
});
