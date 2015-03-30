

$(document).ready(function() {

  var canvas  = 220;

  var svg = d3.select("#players").attr("width", canvas).attr("height", canvas);


  var startingcolour = {
    yellow: "#e7e00f",
    red: "#e71f0f",
    white: "white",
    blue: "#1128d4",
    green: "#268b13",
    black: "black",
    pink: "#de77cc",
    orange: "#e9980c",
    purple: "#890ce9"
  };


  var size    = 40;
  var margin  = 20;
  var amount  = 9;
  var rows    = 3;
  var cols    = 3;


  function players() {
    for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
        var player = svg.append("circle")
          .attr("r", (size * 0.5))
          .attr("cx", ((canvas / cols)) * (c + 1) - (canvas / cols * 0.5))
          .attr("cy", ((canvas / rows)) * (r + 1) - (canvas / cols * 0.5))
          .style("fill", "red");
        for (var x in startingcolour) {
          player.style("fill", x);
        }
      }
    }
  }

  players();


});
