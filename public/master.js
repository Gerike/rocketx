/**
 * Created by Win10 on 2017. 01. 03..
 */
'use strict';
$(document).ready(() => {
  $('#__login_button').click( (e) => {
    e.preventDefault();
    let request = $.ajax({
      method: "POST",
      url: "/login",
      data: $('#__login_form').serialize(),
    });

    request.fail( (data) => {
      document.getElementById('__login_error').innerHTML = (data.responseText == undefined || data.responseText == "") ? 'Login error' : data.responseText;
      $('#__login_error').fadeIn();
      setTimeout( () => {$('#__login_error').fadeOut();;}, 3000 );
    });

    request.done( () => {
      location.reload();
    });
  });
});

