

$(document).ready(function() {

  // Some settings

  var canvas  = 220;
  var size    = 40;
  var rows    = 3;
  var cols    = 3;


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
    {color: 'orange', value: '#e9980c'},
    {color: 'purple', value: '#890ce9'}
  ];

  var set = svg.selectAll("circle")
            .data(playerColours)
            .enter()
            .append("circle")
            .attr("r", (size * 0.5))
            .attr("class", function(d) {
              return d.color;
            })
            .style("fill", function(d) {
              return d.value;
            });



  // Calculate positions

  var positions = [];
  for (r = 0; r < rows; r++) {
    for (c = 0; c < cols; c++) {
      positions.push({row: r, col: c});
    }
  }

  set.data(positions)
      .attr("cx", function(d) {
        return (canvas / rows) * (d.row + 1) - (canvas / rows * 0.5);
      })
      .attr("cy", function(d) {
        return (canvas / cols) * (d.col + 1) - (canvas / cols * 0.5);
      });



  $('circle').on('click', function() {
    // $(this).attr("r", size);
  });


});
