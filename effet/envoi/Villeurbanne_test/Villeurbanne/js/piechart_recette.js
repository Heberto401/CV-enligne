// set the dimensions and margins of the graph
var width = 400
height = 400
margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

var sales = [
  { product: 'Fiscalité indirecte', count: 57 },
  { product: 'Fiscalité directe', count: 11 },
  { product: 'Concours financiers externes', count: 15 },
  { product: 'Emprunt', count: 12 },
  { product: 'Autres recettes', count: 5 },
];


myshow();
function myshow() {
  var pie = d3.pie()
    .value(function (d) { return d.count })

  var slices = pie(sales);

  var arc = d3.arc()
    .innerRadius(90)
    .outerRadius(radius);

  // helper that returns a color based on an ID
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  var svg = d3.select('#piechart_recette')
    .append('svg')
    .attr("width", width)
    .attr("height", height)
    .attr("class", "pie");
  var g = svg.append('g')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var arcGraph = g.selectAll('path.slice')
    .data(slices)
    .enter()
    .append('path')
    .attr('class', 'slice')
    .attr('d', arc)
    .attr('fill', function (d) {
      return color(d.data.product);
    });

  arcGraph.transition()
    .duration(1000)
    .attrTween('d', function (d) {
      var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function (t) {
        return arc(interpolate(t));
      };
    });

  // building a legend is as simple as binding
  // more elements to the same data. in this case,
  // <text> tags
  var legend = d3.select('.legendRecette')
    .selectAll('li')
    .data(slices)
    .enter()
    .append('li')
    .attr('class', 'label')
    .text(function (d) { return d.data.product; })
    .append('p')
    .attr('class', 'chiffre')
    .text(function (d) { return d.data.count + "%"; })
    .style('color', function (d) {
      return color(d.data.product);
    });
}