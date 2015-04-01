

$(document).ready(function() {

  // Some settings

  var size    = 20;
  var canvas  = 220;


  // Intialise d3

  var svg = d3.select("#players").attr("width", canvas).attr("height", canvas);



  // Create circles and assign colours

  var playerColours = [
    {color: 'yellow', value: '#e7e00f'},
    {color: 'red', value: '#e71f0f'},
    {color: 'white', value: 'white'},
    {color: 'blue', value: '#1128d4'},
    {color: 'green', value: '#268b13'},
    {color: 'black', value: 'black'},
    {color: 'pink', value: '#de77cc'},
    {color: 'purple', value: '#890ce9'},
    {color: 'orange', value: '#e9980c'}
  ];

  var player = svg.selectAll("circle")
            .data(playerColours)
            .enter()
            .append("circle")
            .attr("r", size)
            .attr("data-name", function(d) {
              return d.color;
            })
            .style("fill", function(d) {
              return d.value;
            });




  // Rows and Columns

  var rows    = 3;
  var cols    = 3;
  var positions = [];

  for (r = 0; r < rows; r++) {
    for (c = 0; c < cols; c++) {
      positions.push({row: r, col: c});
    }
  }

  player.data(positions)
  .transition()
      .attr("cx", function(d) {
        return (canvas / rows) * (d.row + 1) - (canvas / rows * 0.5);
      })
      .attr("cy", function(d) {
        return (canvas / cols) * (d.col + 1) - (canvas / cols * 0.5);
      });




  // Select players

  d3.selectAll("circle").on("click", function () {
    var activeClass = "active";
    var alreadyIsActive = d3.select(this).classed(activeClass);
    d3.select(this).classed(activeClass, !alreadyIsActive);
  });



  // Spin

  var selected = [];

  $('.submit').on("click", function() {

    $('.wrapper').addClass('animate');

    $('circle.active').each(function() {
      selected.push($(this).data('name'));
    });

    $('circle:not(.active)').detach();
    var amount = selected.length;

    var result = selected[Math.floor(Math.random() * selected.length)];
    console.log(result);

    var duration = 1000;

    var canvas = (amount * 10) + 30;
    d3.select("#players")
        .transition()
        .duration(duration)
        .attr("width", canvas)
        .attr("height", canvas);

    var newPositions = [];
    var cDiam = canvas - size;
    var cRad  = cDiam / 2;
    var offset = (canvas - cDiam) / 2;
    var cAngle = (2 * Math.PI) / amount;

    for (p = 0; p < amount; p++) {
      var x = offset + cRad + cRad * Math.cos(cAngle * (p + 1));
      var y = offset + cRad + cRad * Math.sin(cAngle * (p + 1));
      newPositions.push({xCoor: x, yCoor: y});
    }

    svg.selectAll('circle').data(newPositions)
        .transition()
        .duration(duration)
        .attr("cx", function(d) {
          return d.xCoor;
        })
        .attr("cy", function(d) {
          return d.yCoor;
        });

  });



});
