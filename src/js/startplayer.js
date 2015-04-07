

$(document).ready(function() {


  // Create players

  $.getJSON( "../config/palette.json", function(data) {
    $.each(data.playerColour, function(key, val) {
      $('.players ul').append('<li class="' + key + '" aria-selected="false"><div></div></li>');
    });
  });



  // Toggle selected items

  $('.players').on('click', 'li', function() {
    $(this).attr('aria-selected', function (i, attr) {
        return attr == 'true' ? 'false' : 'true';
    });
  });

  $(document).on('click', 'h1', function() {
    $('.players li').attr('aria-selected', 'true');
  });



  var selected = [];

  $('.startplayer .submit').on("click", function() {

    // Create pool of selected players
    var selected = $('.players li[aria-selected="true"]').map(function(i,el){
      return el.className;
    }).get();

    // Generate random winner
    var result = selected[Math.floor(Math.random() * selected.length)];
    if ( $('.players li').hasClass(result) ) {
      $('.players li.' + result).addClass('winner');
    }
    console.log(result);

    // Hide unselected players
    $('.players li[aria-selected="false"]').detach(); // Don't like removing from DOM

    $('.players').addClass('animate-' + selected.length + '');

    $('body').on('animationend webkitAnimationEnd oAnimationEnd', '.players ul', function () {
      $('.winner').addClass('show');
    });

  });

});
