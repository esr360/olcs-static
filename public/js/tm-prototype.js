$(document).on('ready', function() {

  // Set username
  var user = {
    name: 'Terry Jones',
    company: ""
  };

  if (user.name && $(".user-menu__item").length > 1) {
    $(".user-menu__item:first").html(""+user.name+", <b>"+user.company+"</b>");
  }

  // Store user details in local storage
  $(document).on('click','.js-sign-in', function(e) {
    var username  = $('#username').val();
    localStorage.name  = username;
  });

  /**
   * Transport manager list
   */

  // Show 'add' TM modal
  $(document).on('click', '.js-add-tm', function(e) {
    e.preventDefault();
    $('.add-tm .js-edit-modal').show();
  });

  // Show 'edit' TM modal
  $(document).on('click','.js-edit-user', function(e) {
    e.preventDefault();
    $('.add-tm .js-edit-modal').show();
  });

  // Show remove confirmation message
  $(document).on('click','.right', function(e) {
    e.preventDefault();
    localStorage.itemToDelete = $(this).parents('tr').index();
    $('.js-confirm-modal').show();
  });

  // Remove row item
  $(document).on('click','.js-remove', function(e) {
    e.preventDefault();
    $('tbody tr').eq(localStorage.itemToDelete).remove();
    if (!$('tbody tr').length) {
      $('.js-empty').show();
      $('.js-table').hide();
    }
    $('.js-confirm-modal').hide();
  });


  /**
   * Add Transport manager modal
   */

  // Hide all the fields
  $('.js-tm-email-address, .js-account-details, .js-tm-details, .add-tm .guidance, .js-send-form-btn, .js-tm-morgan, .js-tm-katy').hide();

  $('.js-tm-no-email-guidance').prop('checked',true);


  // Add a new user
  $(document).on('click', '.js-add-new-user', function(e) {
    e.preventDefault();
    $('.js-tm-email-address, .js-send-form-btn').show();
    $('.js-continue-btn, .js-select-user').hide();
    $('#username, #firstname, #lastname, #email, #repeat-email, #day, #month, #year, #tm-select').val("");
    $('input[value="has-email"]').prop('checked',true);
    $('.js-account-details').show();
    showTMForm();
  });

  function showTMForm() {
    $('.js-tm-details, .js-tm-guidance, .js-send-form-btn').show();
    $('.js-tm-morgan, .js-tm-katy, .js-tm-no-email-guidance, .js-continue-btn').hide();
  }

  function hideTMForm() {
    $('.js-tm-details, .js-tm-morgan, .js-tm-katy, .js-send-form-btn, .js-send-form-btn, .js-tm-guidance').hide();
    $('.js-continue-btn, .js-tm-no-email-guidance').show();
  }

  function showProfile(selector) {
    $(selector+', .js-tm-guidance, .js-send-form-btn').show();
    $('.js-tm-email-address, .js-tm-details, .js-tm-no-email-guidance,.js-continue-btn').hide();
  }

  // Populate form
  $(document).on('change', '#tm-select', function(e) {
    console.log($(this).val());
    e.preventDefault();

    if ($(this).val() === 'morgan') {
      showProfile('.js-tm-morgan');
      $('.js-tm-katy').hide();
    }
    if ($(this).val() === 'katy' || $(this).val() === 'please-select') {
      showProfile('.js-tm-katy');
      $('.js-tm-morgan').hide();
    }
    if ($(this).val() === '') {
      $('.js-continue-btn').show();
      $('fieldset[class^="js"], .guidance').hide();
    }
  });


  // Does the TM have an email address ?
  $(document).on('change', 'input[name="email-address"]', function(e) {
    e.preventDefault();
    if ($('input[value="has-email"]').is(':checked')) {
      $('.js-account-details').show();
      $('.js-tm-guidance').show();
      $('.js-tm-no-email-guidance').hide();
    } else {
      $('.js-account-details').hide();
      $('.js-tm-guidance').hide();
      $('.js-tm-no-email-guidance').show();

    }
  });

  // Fake username search
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  var usernameField = '.add-tm #username';

  $('<span class=inline-search__loading></span>').insertAfter(usernameField).hide();

  $(usernameField).keyup( function() {
      delay(function(){
        $('.inline-search__loading').hide();
        if ($(usernameField).val().length === 0) {
          return false;
        }
        if ($(usernameField).val().indexOf(' ') > -1) {
          $('<p class="inline-search__message red">Your username cannot contain spaces</p>').insertAfter(usernameField);
        } else if ($(usernameField).val().length <= 4) {
          $('<p class="inline-search__message red">Your username must be atleast 5 characters long</p>').insertAfter(usernameField);
        } else {
          $('<p class="inline-search__message green">This username is available</p>').insertAfter(usernameField);
        }
      }, 1000 );
  });

  $(usernameField).keydown(function(e) {
    if(e.keyCode != 9) {
      $('.inline-search__message').remove();
      $('.inline-search__loading').show();
    }
  });


  // Add new row to transport manager table
  $(document).on('click', '.js-send-form-btn', function(e) {
    e.preventDefault();
    var template = '<tr><td><a href>Dave Willis</a><span class="status orange">Incomplete</span></td><td>3 May 1978</td><td>dave.willis@gmail.com</td><td class=right><a href>Remove</a></td></tr>';
    $('tbody').append(template);

    $('.js-empty, .js-edit-modal').hide();
    $('.js-table').show();

  });

  // Enhance date input
  $('#day').keyup(function() {
    if ($(this).val().length === 2) {
      $('#month').focus();
    }
  });

  $('#month').keyup(function() {
    if ($(this).val().length === 2) {
      $('#year').focus();
    }
  });


  /**
   * Transport manager details
   */

  $('.post-info, .js-revoked-table, .js-print-sign').hide();


  // Does the TM have an email address ?
  $(document).on('change', 'input[name="cpc"]', function(e) {
    e.preventDefault();
    if ($('input[value="upload"]').is(':checked')) {
      $('.file-uploader').show();
      $('.post-info').hide();
    } else {
      $('.post-info').show();
      $('.file-uploader').hide();
    }
  });

  // Fake document upload
  $(document).on('change', '.attach-action__input', function(e) {
    e.preventDefault();
    delay(function(){
      $('.file__remove').html('<a href="">Remove</a>');
    }, 2000 );
  });

  // Fake document upload
  $(document).on('click', '.file__remove a', function(e) {
    e.preventDefault();
    $('.file').remove();
  });

  // Postcode search
  $('.js-address-lines, .js-select').hide();

  $(document).on('click','.js-find', function(e) {
      e.preventDefault();
      var button = $(this);
      var select = $(this).parent('.field').next('.js-select');
      var addressLines = $(this).parents('fieldset').next('.js-address-lines');

      select.find('select').val('please-select');
      addressLines.find('.js-address-1').val('');
      addressLines.find('.js-address-city').val('');
      addressLines.find('.js-address-postcode').val('');
      addressLines.find('.js-address-country').val('');

      addressLines.hide();
      button.prop('disabled',true);
      $("<div class=address__preloader></div>").insertAfter(button);

      delay(function(){
        button.prop('disabled',false);
        $('.address__preloader').hide();
        select.show();
      }, 750 );
  });

  $(document).on('change', '.js-select select', function(e) {
    e.preventDefault();
    var addressLines = $(this).parents('fieldset').next('.js-address-lines');

    $(this).parent('.js-select').hide();
    addressLines.show();

    addressLines.find('.js-address-1').val('16 Pasture Grove');
    addressLines.find('.js-address-city').val('Leeds');
    addressLines.find('.js-address-postcode').val('LS7 4QP');
    addressLines.find('.js-address-country').val('uk');
  });

  $(document).on('click','.hint--small a', function(e) {
    e.preventDefault();
    var addressLines = $(this).parents('fieldset').next('.js-address-lines');
    addressLines.show();
  });


  // Toggle revoked licences modal


  $(document).on('click', '.js-show-modal', function(e) {
    e.preventDefault();
    $('.js-add-licence-modal').show();
  });

  $(document).on('click', '.js-add-licence', function(e) {
    e.preventDefault();
    $('.js-add-licence-modal, .js-revoked').hide();
    $('.js-revoked-table').show();
  });



  // Toggle declarations options

  // Hide them on document ready
  $('.js-verify, .js-print-sign').hide();

  $(document).on('change', 'input[name="declarations"]', function(e) {
    e.preventDefault();
    if ($('input[value="verify"]').is(':checked')) {
      $('.js-verify').show();
      $('.js-print-sign').hide();
    } else {
      $('.js-print-sign').show();
      $('.js-verify').hide();
    }
  });


});