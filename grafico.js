// Establecemos los márgenes.
var margin = {top: 100, right: 100, bottom: 100, left: 100},
width = 1200 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// Movemos el grafico dentro del SVG aplicando los margenes.
var svg_area = d3
.select("#grafico")
   .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
   .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("https://raw.githubusercontent.com/uunaii/R10_Granate_visu/main/df_quiz_vars.csv", function(data) {

      console.log(data)

});

