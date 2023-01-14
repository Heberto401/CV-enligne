function reveal() {
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
    var color = d3.scaleOrdinal( d3.schemeDark2);
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
                        })
                    .style('font-family','Roboto')
   
                  
    var reveals = document.querySelectorAll(".chiffre"); 
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 200;
        if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
        } else {
        reveals[i].classList.remove("active");
        }
    }
    var revealsN = document.querySelectorAll(".label"); 
    for (var i = 0; i < revealsN.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = revealsN[i].getBoundingClientRect().top;
        var elementVisible = 200;
        if (elementTop < windowHeight - elementVisible) {
        revealsN[i].classList.add("active");
        } else {
        revealsN[i].classList.remove("active");
        }
    }
    
}
window.addEventListener("scroll", reveal);