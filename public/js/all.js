$(document).ready(function() {


  // Fast Click
  $(function() {
      FastClick.attach(document.body);
  });



});

$(document).ready(function() {


  var selected = [];

  // Starting Colour - choose colours playing
  $('.starting-colour .players input').on('click', function() {

    $(this).parent().toggleClass('active');

  });



  $('.submit').on('click', function() {

    var player = '.starting-colour .players li';

    // Create the pool to which we will find the starting player
    var selected = $('.starting-colour .players input:checked').map(function(i,el){return el.name;}).get();
    // Randomise the result
    var result = selected[Math.floor(Math.random()*selected.length)];

    // Hide the submit button
    $(this).addClass('reset').html('RESET');
    $('.reset').removeClass('submit');
    $('.reset').on('click', function() {
      location.reload();
    });

    // Hide all the unused colours and animate the used
    $('.starting-colour .players li:not(.active)').hide();
    setTimeout(function() {
      $('.starting-colour .players li:not(.active)').detach();
    }, 200);
    $('.starting-colour .players li.active').addClass('animate');

    // Add a class to the container for animation dependant on the amount of players
    var amount = $('.starting-colour .players li.active').length;
    $('.starting-colour .players').addClass('amount-' + amount);

    //
    setTimeout(function() {
      $('.starting-colour .players').addClass('animation-stopping');
    }, 3000);

    setTimeout(function() {
      $('.starting-colour .players').removeClass('animation-stopping');
      $('.starting-colour .players').addClass('animation-stopped');
      if ( $('.starting-colour .players li input').hasClass(result) ) {
        $('.starting-colour .players li input.' + result).parent().addClass('winner');
      }
    }, 3500);

  });



});
