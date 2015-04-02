$(document).ready(function() {




  // Toggle selected items

  $(".players li").on('click', function() {
    $(this).attr('aria-selected', function (i, attr) {
        return attr == 'true' ? 'false' : 'true';
    });
  });



  //

  var selected = [];

  $('.startplayer .submit').on("click", function() {

    // $('.wrapper').addClass('animate');

    var selected = $('.players li[aria-selected="true"]').map(function(i,el){
      return el.className;
    }).get();

    var result = selected[Math.floor(Math.random() * selected.length)];
    console.log(result);

    $('.players li[aria-selected="false"]').addClass('hidden');


    //     setTimeout(function() {
    //       $('.starting-colour .players li:not(.active)').detach();
    //     }, 200);
    //     $('.starting-colour .players li.active').addClass('animate');
    //
    //     // Add a class to the container for animation dependant on the amount of players
    //     var amount = $('.starting-colour .players li.active').length;
    //     $('.starting-colour .players').addClass('amount-' + amount);
    //
    //     //
    //     setTimeout(function() {
    //       $('.starting-colour .players').addClass('animation-stopping');
    //     }, 3000);
    //
    //     setTimeout(function() {
    //       $('.starting-colour .players').removeClass('animation-stopping');
    //       $('.starting-colour .players').addClass('animation-stopped');
    //       if ( $('.starting-colour .players li div').hasClass(result) ) {
    //         $('.starting-colour .players li .' + result).parent().addClass('winner');
    //       }
    //     }, 3500);

  });

});
