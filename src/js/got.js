

$(document).ready(function() {

  //
  //
  // $(".go").on("click", function() {
  //
  //   var players = $( ".select-players option:selected" ).text();
  //
  //   houses.length = players
  //
  //   // for(i = 0; i < players; i++) {
  //
  //   function getHouse() {
  //     return houses[Math.floor(Math.random() * houses.length)];
  //   }
  //
  //   $(".results").append(getHouse());
  //   // }
  //
  // });

  var houses = ["stark", "lannister", "baratheon", "arryn"];





  // houses[Math.floor(Math.random() * houses.length)];


  $('.go').on('click', function() {

    var players = $( ".select-players option:selected" ).text();
    // houses.length = players;
    houses.sort(function() { return 0.5 - Math.random();})

      var ran = houses.pop();
      $(".results").text(ran ? ran : '');
  });

});
