

$(document).ready(function() {


  // Create players

  function createPlayers() {
    $.getJSON( "../config/palette.json", function(data) {
      $.each(data.playerColour, function(key, val) {
        $('.players ul').append('<li class="' + key + '" aria-selected="false"><div></div></li>');
      });
    });
  };
  createPlayers();


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

  $('.submit').on("click", function() {

    $('.submit').addClass('hidden');

    // Create pool of selected players
    var selected = $('.players li[aria-selected="true"]').map(function(i,el){
      return el.className;
    }).get();

    // Generate random winner
    var result = selected[Math.floor(Math.random() * selected.length)];
    if ( $('.players li').hasClass(result) ) {
      $('.players li.' + result).addClass('winner');
    }

    // Hide unselected players
    $('.players li[aria-selected="false"]').detach(); // Don't like removing from DOM

    // Add class to determine items positions in spinning circle
    $('.players').addClass('animate-' + selected.length + '');

    // Wait for animation to end and apply stopped class and show the winner
    $('body').on('animationend webkitAnimationEnd oAnimationEnd', '.players[class*="animate-"] ul', function () {

      $('.players').addClass('stopped');
      $('.winner').addClass('show');

      $('.reset').removeClass('hidden');

    });

  });

  $('.reset').on('click', function() {
    $('.players li').detach();
    $('.players').removeClass('stopped');
    $('.players').removeClass (function (index, css) {
      return (css.match (/(^|\s)animate-\S+/g) || []).join(' ');
    });
    createPlayers();
    $('.reset').addClass('hidden');
    $('.submit').removeClass('hidden');
  });




});
