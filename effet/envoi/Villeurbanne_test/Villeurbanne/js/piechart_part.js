// set the dimensions and margins of the graph
var width = 400
    height = 400
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

var sales = [
  { product: 'Budget',  count: 94.8 },
  { product: 'Reste',  count: 5.2 },
  ];

var pie = d3.pie()
            .value(function(d) { return d.count })

var slices = pie(sales);

var arc = d3.arc()
            .innerRadius(90)
            .outerRadius(radius);

// set the color scale
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("#piechart_part")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var arcGraph =g.selectAll('path.slice')
              .data(slices)
              .enter()
              .append('path')
              .attr('class', 'slice')
              .attr('d', arc)
              .attr('fill', function(d) {
                return color(d.data.product);
              });

arcGraph.transition()
        .duration(1000)
        .attrTween('d', function(d) {
            var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
            return function(t) {
                return arc(interpolate(t));
            };
        });