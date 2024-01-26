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


d3.csv("https://raw.githubusercontent.com/jpvmu/Visu-03/main/examen_visu.csv", function(data) {

   // Utilizamos el metodo timeParse para el formato de fecha.
   var parseTime = d3.timeParse("%Y-%m-%d");

   // Pasamos valores a fecha y numericos, por defecto d3 carga strings.
   data.forEach(function(d) {
      d.Date = parseTime(d.Date);
      d.Valor_1 = +d.Valor_1;
      d.Valor_2 = +d.Valor_2;
  });

   // Eje X
   var x = d3
   .scaleTime()
      .domain([parseTime("1992-01-01"), parseTime("2022-01-01")])
      .range([0, width]);
   svg_area.append('g')
   .attr('transform','translate(0,' + height +')')
   .call(d3.axisBottom(x))

   // Eje Y 1
   var y_1 = d3
   .scaleLinear()
      .domain([0, 3250])
      .range([height, 0]);
   svg_area
   .append('g')
   .call(d3.axisLeft(y_1))

   // Eje Y 2
   var y_2 = d3
   .scaleLinear()
      .domain([0, 1900000])
      .range([height, 0]);
   svg_area.append('g')
      .attr('transform',"translate("+ width +")")
      .call(d3.axisRight(y_2))


   // Definimos los puntos con Valor_2.
   svg_area.append('g')
   .selectAll("dot")
      .data(data)
         .enter()
         .append("circle")
         .attr('cx',function(d){return x(d.Date)})
         .attr('cy',function(d){return y_2(d.Valor_2)})
         .attr('r',3)
         .style('fill','#7030a0')
         .style('opacity',0.5)
         .on('mouseover',function(event,d){
            d3.select(this)
            .transition()
            .duration(200)
            .attr('stroke','black')
            .attr('r',6)
            .style('fill','#7030a0')
            .style('opacity',1)
            
         })
         .on('mouseleave',function(event,d){
            d3.select(this)
            .transition()
            .duration(200)
            .attr('r',3)
            .style('fill','#7030a0')
            .style('opacity',0.5)

         })


   // Definimos la linea con Valor_1.
   var linea_valores = d3
   .line()
      .x(function(d) { return x(d.Date); })
      .y(function(d) { return y_1(d.Valor_1); });

   svg_area
   .append("path")
      .data([data])
         .attr("fill", "none")
         .attr("stroke","#00b0f0")
         .attr("d", linea_valores)
         .attr('stroke-width',3)
         
   
   // Introducimos puntos en la linea con Valor_1.

   // Eje y
   svg_area.append('text')
      .attr('text-anchor','middle')
      .attr('transform',`rotate(-90)`)
      .attr('x',-height/2)
      .attr('y',-60)
      .text('Impacto')
      .style('fill','blue')
      .style('font-family','verdana')

      // Eje y secundario
      svg_area.append('text')
      .attr('text-anchor','middle')
      .attr('transform',`rotate(-90)`)
      .attr('x',0 - (height/2))
      .attr('y',width+60)
      .attr('dy','1em')
      .text('Impacto')
      .style('fill','purple')
      .style('font-size','18px')
      .style('font-family','verdana')
      


      // Eje x
      svg_area.append('text')
      .attr('text-anchor','middle')
      .attr('x',width/2)
      .attr('y',350)
      .text('Fecha')
      .style('fill','black')
      .style('font-size','18px')
      .style('font-family','verdana')
      

      // Titulo
      svg_area.append('text')
      .attr('text-anchor','middle')
      .attr('x',470)
      .attr('y',-50)
      .text('Impacto Web vs Dinero Generado')
      .style('fill','black')
      // No se especifica el tipo de letra
      .style('font-family','monospace')
      .style('text-decoration','underline')
      .style('font-size','28px')
      



      // Puntos transparentes
      svg_area.append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx',function(d){return x(d.Date)})
      .attr('cy',function(d){return y_1(d.Valor_1)})
      .attr('r',5)
      .style('fill','transparent')
      .style('opacity',1)
      .on('click',function(event,d){
         d3.select(this)
         .transition()
         .duration(200)
         .attr('r',8)
         .style('fill','blue')
         .attr('opacity',1)
         .attr('cx',function(d){return x(d.Date)})
         .attr('cy',function(d){return y_1(d.Valor_1+50)})
         })
         .on('dblclick',function(event,d){
            d3.select(this)
            .transition()
            .duration(200)
            .attr('r',5)
            .style('fill','transparent')
            .attr('opacity',1)
            .attr('cx',function(d){return x(d.Date)})
            .attr('cy',function(d){return y_1(d.Valor_1)})
            })
      
      

   

});

