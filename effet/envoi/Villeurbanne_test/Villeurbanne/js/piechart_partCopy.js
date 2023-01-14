function reveal(){
    d3.select('#piechart_part').html("")
    // set the dimensions and margins of the graph
    var width = 400
        height = 400
        margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    
    var sales = [
    { product: 'Budget',  count: 59.29 },
    { product: 'Reste',  count: 40.71 },
    ];
        var pie = d3.pie()
                    .value(function(d) { return d.count })

        var slices = pie(sales);
        

        var arc = d3.arc()
                    .innerRadius(90)
                    .outerRadius(radius);

        // set the color scale
        var color = d3.scaleOrdinal()
                    .range(["#99e6d1", "#FFF"]);

        var svg = d3.select("#piechart_part")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
        var g = svg.append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var arcGraph =g.selectAll('test.slice')
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

        g.append("circle")
        .attr("cx", 0 )
        .attr("cy", 0)
        .attr("r", 160)
        .attr('class','cicrle')
        .style("stroke-width", 4)    // set the stroke width
        .style("stroke", "#99e6d1")      // set the line colour
        .style("fill", "none")

        g.append("circle")
        .attr("cx", 0 )
        .attr("cy", 0)
        .attr("r", 90)
        .attr('class','cicrle')
        .style("stroke-width", 4)    // set the stroke width
        .style("stroke", "none")      // set the line colour
        .style("fill", "#e6e6e6")

        g.append('text')
            .text('59.29%')
            .attr("text-anchor", "middle") 
            .attr("x", 0 )
            .attr("y", 12) 
            .style("font-size", "1.4rem")
            .style('font-weight', 'bold')
            .style('font-family','Roboto');
            
            
        
            
    var reveals = document.querySelectorAll("#piechart_part"); 
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

