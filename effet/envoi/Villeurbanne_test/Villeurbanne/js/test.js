
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectedscatter.csv",function(data) {
// List of groups (here I have one group per column)
    var allGroup = ["valueA", "valueB"] // Name jointure avec le csv
    
    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
        return {
            name:grpName,
            values: data.map(function(d) {
            return {time: d.time, value: +d[grpName]};
            })
        };
    });
  
    
});