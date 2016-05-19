$(document).ready(function() {


  var user = {
    name: localStorage.name,
    company:  localStorage.company,
    email: localStorage.email
  };

  if (user.name && $(".user-menu__item").length > 1) {
    $(".user-menu__item:first").html(""+user.name+", <b>"+user.company+"</b>");
  }

  if (user.email) {
    $(".js-email").text(user.email);
  }



  /*
    Sign in
   */

  // Store user details in local storage
  $(document).on('click','.js-sign-in', function(e) {
    var username  = $('#username').val();
    localStorage.name  = username;
  });



  /*
    Create an account
   */

  // Fake username search
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  var usernameField = '.create-account #username, .manage-users #username';

  $('<span class=inline-search__loading></span>').insertAfter('#username').hide();

  // Fake username lookup
  $(usernameField).keyup(function() {
      delay(function(){
        $('.inline-search__loading').hide();
        if ($(usernameField).val().length === 0) {
          return false;
        }
        if ($(usernameField).val().indexOf(' ') > -1) {
          $('<p class="inline-search__message red">Your username cannot contain spaces</p>').insertAfter('#username');
        } else if ($('#username').val().length <= 4) {
          $('<p class="inline-search__message red">Your username must be atleast 5 characters long</p>').insertAfter('#username');
        } else {
          $('<p class="inline-search__message green">This username is available</p>').insertAfter('#username');
        }
      }, 1000 );
  });

  $(usernameField).keydown(function() {
    $('.inline-search__message').remove();
    $('.inline-search__loading').show();
  });

  $('.js-no-existing-licence').prop('checked',true);

  // Conditional fields for existing licence holders
  $('.js-licence-no, .js-create-account-btn-existing').hide();
  $(document).on('change', 'input[name="licence-holder"]', function() {
    if ($('input[name="licence-holder"]:checked').val() === 'Yes') {
      $('.js-licence-no, .js-create-account-btn-existing').show();
      $('.js-create-account-btn').hide();
      $('.js-organisation-name').hide();
    }
    else {
      $('.js-licence-no, .js-create-account-btn-existing').hide();
      $('.js-create-account-btn').show();
      $('.js-organisation-name').show();
    }

  });



  // Store user details in local storage and submit the form
  $(document).on('click','.js-create-account-btn', function(e) {
    // e.preventDefault();
    localStorage.name      = $('.create-account #username').val();
    localStorage.firstname = $('.create-account #firstname').val();
    localStorage.lastname  = $('.create-account #lastname').val();
    localStorage.email     = $('.create-account #email').val();
    localStorage.company   = $('.create-account #company').val();

  });




  /*
    Manage users
   */

  // Show 'add' user modal
  $(document).on('click','.js-add-new-user', function(e) {
    e.preventDefault();
    $('.js-add-modal').show();
  });

  // Show 'edit' user modal
  $(document).on('click','.js-edit-user', function(e) {
    e.preventDefault();
    $('.js-edit-modal').show();
  });

  // Show 'confirm' user modal
  $(document).on('click','.remove', function(e) {
    e.preventDefault();
    $('.js-confirm-modal').show();
  });

  // Close modal
  $(document).on('click','.modal__close', function(e) {
    e.preventDefault();
    $('.js-edit-modal, .js-add-modal, .js-confirm-modal').hide();
  });

  // Delete row
  $(document).on('click','.js-remove', function(e) {
    e.preventDefault();
    $('#dave').remove();
    $('.js-confirm-modal').hide();
  });

  // Add new user
  $(document).on('click','.js-add-modal .action--primary', function(e) {
    e.preventDefault();

    var firstname  = $('#firstname').val();
    var lastname   = $('#lastname').val();
    var fullname   = firstname+' '+lastname;
    var email      = $('#email').val();
    var permission = $('.checkbox input[type=radio]:checked').parent('label').text();

    $('tbody').append([
      '<tr>',
        '<td><b><a href="" class="js-edit-user">'+fullname+'</a></b></td>',
        '<td>'+email+'</td>',
        '<td>'+permission+'</td>',
        '<td><a class="remove" href="">Remove</a></td>',
      '</tr>'
    ].join('\n'));

    $('.js-add-modal').hide();
  });


  /*
    Check details
   */

  // Correct address
  $('input[value="true"]').prop('checked',true);
  $('.js-incorrect-address').hide();

  $(document).on('change', 'input[name="correct-address"]', function() {
    if ($('input[name="correct-address"]:checked').val() === 'true') {
      $('.js-correct-address').show();
      $('.js-incorrect-address').hide();
    }
    else {
      $('.js-correct-address').hide();
      $('.js-incorrect-address').show();
    }

  });




  /*
    My account
   */

  // Set values
  $('.my-account #username').val(localStorage.name);
  $('.my-account #firstname').val(localStorage.firstname);
  $('.my-account #lastname').val(localStorage.lastname);
  $('.my-account #email').val(localStorage.email);


  // Only show confirm email field if it's dirty
  var confirmEmail = $('#confirm-new').parent('.field');
  confirmEmail.hide();

  $(document).on('input','.my-account #email', function(e) {
    confirmEmail.show();
  });

  // Save changes
  $(document).on('click','.my-account .js-save-changes', function(e) {
    e.preventDefault();
    window.location.href = "?updated-account";
    localStorage.name      = $('.my-account #username').val();
    localStorage.firstname = $('.my-account #firstname').val();
    localStorage.lastname  = $('.my-account #lastname').val();
    localStorage.email     = $('.my-account #email').val();
  });

  // Show flash message
  var url = window.location.search;
  if (url.match("updated-account").length > 0) {
    $('body').append([
      '<div class="notice-container">',
        '<div class="notice--success">',
          '<p>You have successfully updated your details</p>',
        '</div>',
      '</div>'
    ].join('\n'));
  }

  OLCS.ready(function() {
    OLCS.eventEmitter.emit("render");
  });


});