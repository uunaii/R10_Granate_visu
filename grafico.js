// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Define the zoom behavior
var zoom = d3.zoom()
    .scaleExtent([1, 8]) // Limit zoom scale from 1x to 8x
    .on("zoom", zoomed);

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
    .center([11, 53]) // Centered in Europe
    .scale(400) // Adjust the scale as needed
    .translate([width / 2, height / 2]);

// Apply zoom behavior to the SVG
svg.call(zoom);

// Data and color scale
var data = new Map(); // Using ES6 Map for data storage

// Load data from CSV file
d3.csv("https://raw.githubusercontent.com/uunaii/R10_Granate_visu/main/df_quiz_vars.csv", function(csvData) {
    csvData.forEach(function(d) {
        var country = d.country;
        if (!data.has(country)) {
            data.set(country, 0);
        }
        data.set(country, data.get(country) + 1);
    });

    // Load world geoJSON data
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function(geoData) {

        // Merge data with GeoJSON
        geoData.features.forEach(function(feature) {
            var country = feature.properties.name;
            feature.total = data.get(country) || 0;
        });

        // Color scale
        var colorScale = d3.scaleLinear()
            .domain([0, d3.max(geoData.features, d => d.total)])
            .range(["#e0ecf4", "#8856a7"]); // Adjust color range as needed, using pastel blue

        // Draw the map
        svg.append("g")
            .selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", function(d) {
                return colorScale(d.total);
            })
            .on("mouseover", function(d) {
                // Show tooltip or highlight effect
                d3.select(this).style("opacity", 0.7);
            })
            .on("mouseout", function(d) {
                // Hide tooltip or remove highlight effect
                d3.select(this).style("opacity", 1);
            });

        // Add legend
        var legend = d3.select("#legend")
            .append("svg")
            .attr("width", 150)
            .attr("height", 100);

        var legendLinear = d3.legendColor()
            .scale(colorScale)
            .shapeWidth(30)
            .orient("vertical")
            .labelFormat(d3.format(".0f"));

        legend.call(legendLinear);

    });
});

// Function to handle zoom event
function zoomed() {
    svg.selectAll("path").attr("transform", d3.event.transform);
}
