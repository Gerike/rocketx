'use strict';
$(document).ready(() => {
  $('#__login_button').click( e => {
    e.preventDefault();
    let request = $.ajax({
      method: "POST",
      url: "/login",
      data: $('#login_form').serialize(),
    });

    request.fail( data => console.log(data));

    request.done( () => {
      location.reload();
    });
  });

  $('#play_button').on('click', () => window.location.href = "/play");
});

