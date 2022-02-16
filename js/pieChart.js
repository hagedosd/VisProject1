class pieChart {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 450,
            containerHeight: _config.containerHeight || 450,
            // margin: {top: 25, right: 20, bottom: 30, left: 50},
            margin: 40,
            tooltipPadding: _config.tooltipPadding || 15
  
      }
  
    this.data = _data; 
  
    this.initVis();
    }

    initVis(){
        
        // Width and height as the inner dimensions of the chart area- as before
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        vis.radius = Math.min(vis.width, vis.height) / 2 - vis.config.margin

        // append the svg object to the div called 'my_dataviz'
        var svg = d3.select("#pie-chart")
        .append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
        .append("g")
            .attr("transform", "translate(" + vis.width / 2 + "," + vis.height / 2 + ")");

        // set the color scale
        var color = d3.scaleOrdinal()
        .domain(data)
        .range(d3.schemeSet2);
    }

    updateVis(){
        // Compute the position of each group on the pie:
        var pie = d3.pie()
        .value(function(d) {return d.value; })
        var data_ready = pie(d3.entries(data))
        // Now I know that group A goes from 0 degrees to x degrees and so on.

        // shape helper to build arcs:
        var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(vis.radius)

    }

    renderVis(){
        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
            .attr('d', arcGenerator)
            .attr('fill', function(d){ return(color(d.data.key)) })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

        // Now add the annotation. Use the centroid method to get the best coordinates
        svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function(d){ return "grp " + d.data.key})
        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17)
    }
}