$(document).ready(function() {

  // Sign your declarations page
  $('.js-owner, .js-verify, .js-print-sign, .js-employee').hide();

  // Toggle signature options
  $(document).on('change', 'input[name="declarations"]', function(e) {
    e.preventDefault();
    $('.js-action').hide();
    if ($('input[value="verify"]').is(':checked')) {
      $('.js-verify').show();
      $('.js-print-sign').hide();
    } else {
      $('.js-print-sign').show();
      $('.js-verify').hide();
    }
  });

});