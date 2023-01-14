function reveal() {
    // set the dimensions and margins of the graph
  var width = 400
  height = 400
  margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin

  var sales = [
    { product: 'Fiscalité directe', count: 59.29 },
    { product: 'Dotation Etat', count: 11.77 },
    { product: 'Produits du domaine et des immeubles', count: 7.85 },
    { product: 'Métropole', count: 7.51 },
    { product: 'Subventions', count: 6.94 },
    { product: 'Autres', count: 5.91 },
    { product: 'Compensations fiscales Etat', count: 0.73 },
  ];
  var pie = d3.pie()
              .value(function (d) { return d.count })

  var slices = pie(sales);
  var arc = d3.arc()
              .innerRadius(90)
              .outerRadius(radius);

    // helper that returns a color based on an ID
  var color = d3.scaleOrdinal( d3.schemeDark2);
  var svg = d3.select('#piechart_recette').html("")
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
    })
  
  var arcGraphTest = g.selectAll('path.slice')
    .data(slices)
    .enter()
    .append('path')
    .attr('class', 'slice')
    .attr('d', arc)
    .attr('fill','#FFF')

  arcGraph.transition()
    .duration(1000)
    .attrTween('d', function (d) {
      var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function (t) {
        return arc(interpolate(t));
      };
    });

    g.append("circle")
      .attr("cx", 0 )
      .attr("cy", 0)
      .attr("r", 90)
      .attr('class','cicrle')
      .style("stroke-width", 4)    // set the stroke width
      .style("stroke", "black")      // set the line colour
      .style("fill", "none")

    g.append('text')
      .attr("text-anchor", "middle") 
      .attr("x", 0 )
      .attr("y", 0) 
      .style("font-size", "1.4rem")
      .style('font-weight', 'bold')
      .style('font-family','Roboto')
      .text("Recettes");
      
      
    // building a legend is as simple as binding
    // more elements to the same data. in this case,
    // <text> tags
    
  var reveals = document.querySelectorAll("#piechart_recette"); 
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
  
}
window.addEventListener("scroll", reveal);
