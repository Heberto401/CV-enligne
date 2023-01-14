function reveal() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 50, bottom: 30, left: 30},
      width = 1000- margin.left - margin.right,
      height = 390 - margin.top - margin.bottom,
      labelPadding= 3;

  // append the svg object to the body of the page
  var svg = d3.select("#scatter_dotations-depenses").html("")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectedscatter.csv", function(data) {
    // List of groups (here I have one group per column)
      var allGroup = ["valueA", "valueB"]
      var Name = ['94M€','56M€']

      // Reformat the data: we need an array of arrays of {x, y} tuples
      var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
        return {
          Final:Name,
          name: grpName,
          values: data.map(function(d) {
            return {time: d.time, value: +d[grpName]};
          })
        };
      });
      // I strongly advise to have a look to dataReady with
      // console.log(dataReady)

      // A color scale: one color for each group
      var myColor = d3.scaleOrdinal()
                      .domain(allGroup)
                      .range(d3.schemeSet2);

      // Add X axis --> it is a date format
      var x = d3.scaleLinear()
                .domain([1,10])
                .range([ 0, width ]);
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
                .domain( [0,20])
                .range([ height, 0 ]);
      svg.append("g")
          .call(d3.axisLeft(y));

      // Add the lines
      var line = d3.line()
                  .x(function(d) { return x(+d.time) })
                  .y(function(d) { return y(+d.value) })
      svg.append("line")
        .attr(
              {
                  "x1" : 0,
                  "x2" : width,
                  "y1" : y(0),
                  "y2" : y(0),
                  "fill" : "none",
                  "shape-rendering" : "crispEdges",
                  "stroke" : "black",
                  "class":"horizontalGrid",
                  "stroke-width" : "1px",
                  "stroke-dasharray": ("3, 3")
                  });

      var Mylines= svg.selectAll("myLines")
                      .data(dataReady)
                      .enter()
                      .append("g")
                      .attr("class", "myLines")
      
      var path = svg.selectAll(".myLines").append("path")
                    .attr("class", "line")
                    .attr("d", function(d) { return line(d.values); })
                    .style("stroke", function(d){ return myColor(d.name) })
                    .style("stroke-width", 4)
                    .style("fill", "none")
                    
      var linePathLength = path.node().getTotalLength()
      path
          .attr("stroke-dasharray", linePathLength)
          .attr("stroke-dashoffset", linePathLength)
          .transition()
              .duration(4000)
              .ease(d3.easeLinear)
              .attr("stroke-dashoffset", 0);
                  
    
      // Add the points
      svg
        // First we need to enter in a group
        .selectAll("myDots")
        .data(dataReady)
        .enter()
          .append('g')
          .style("fill", function(d){ return myColor(d.name) })
        // Second we need to enter in the 'values' part of this group
        .selectAll("myPoints")
        .data(function(d){ return d.values })
        .enter()
        .append("circle")
          .attr("cx", function(d) { return x(d.time) } )
          .attr("cy", function(d) { return y(d.value) } )
          .attr("r", 5)
          .attr("stroke", "black")
      
        svg
          // First we need to enter in a group
          .selectAll("myLabels")
          .data(dataReady)
          .enter()
            .append('g')
          // Second we need to enter in the 'values' part of this group
          .selectAll("myLabelstext")
          .data(function(d){ return d.values })
          .enter()
          .append("text")
            .attr("transform", (d) => "translate(" + x(d.time) + "," + y(d.value) + ")")
            .style("font-size", 15)
            .style("fill","black")
            .attr("font-family", "sans-serif")
            .attr("font-family", "sans-serif")
            .attr("font-weight", 500)
            .attr("x", 12)  // shift the text a bit more right
            .attr("y",-15) // shift the text a bit more right
            .text(function(d) { return d.value; })
      // Add a legend at the end of each line
  })
 

  var reveals = document.querySelectorAll("#scatter_dotations-depenses");
    
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