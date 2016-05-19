$(document).ready(function() {

  // Fake a no results page
  $(document).on('click', '.js-results', function(e) {
    e.preventDefault();
    var keyword = $('.js-operator-keyword').val();
    localStorage.keyword = keyword;

    if (keyword.length <= 3) {
     window.location.href = 'no-results.html';
    } else {
      window.location.href = 'operator-results.html';
    }
  });



  // Focus on the keyword field if there are no results
  $('.js-focus').focus();
  $('.js-focus').val(localStorage.keyword)

  OLCS.ready(function() {
    OLCS.eventEmitter.emit("render");
  });

});