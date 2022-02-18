class barChartAQIRating {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 800,
            containerHeight: _config.containerHeight || 400,
            margin: {top: 25, right: 20, bottom: 30, left: 50},
            tooltipPadding: _config.tooltipPadding || 15
  
      }
  
    this.data = _data; 

    this.initVis();
    }
    initVis() {
        let vis = this;

        // console.log(data[41]);
        vis.keys = data.columns.slice(4, 9);
        // console.log(keys);
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.xScale = d3.scaleBand()
            .domain(vis.keys)
            .range([ 0, vis.width ]);
    
        vis.yScale = d3.scaleLinear()
            .domain([0, 366])
            // .domain(d3.extent(data, d3.max(d[keys])))
            .range([ vis.height, 0 ]);


        // Initialize axes
        vis.xAxis = d3.axisBottom(vis.xScale)
            .tickFormat(d3.format("d")); // Remove thousand comma

        vis.yAxis = d3.axisLeft(vis.yScale)
            .tickSize(-vis.width)
            .tickPadding(10);

        
        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);


        // Append group element that will contain our actual chartNoAQI
        vis.chartNoAQI = vis.svg
        .append("g")
        .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // Append empty x-axis group and move it to the bottom of the chartNoAQI
        vis.xAxisG = vis.chartNoAQI.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`)
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");
        
        // Append y-axis group
        vis.yAxisG = vis.chartNoAQI.append('g')
            .attr('class', 'axis y-axis');

    }

    updateVis() {
        let vis = this;

        vis.chartNoAQI.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", vis.keys)
                .attr("width", vis.xScale.bandwidth())
                .attr("fill", "#69b3a2")
                // no bar at the beginning thus:
                .attr("height", function(d) { return height - vis.yScale(0); }) // always equal to 0
                .attr("y", function(d) { return vis.yScale(0); })
    }

    renderVis() {
        let vis = this;

        vis.chartNoAQI.selectAll("rect")
            .transition()
            .duration(800)
            .attr("y", data[41])
            .attr("height", function(d) { return height - vis.yScale(d.Value); })
            .delay(function(d,i){console.log(i) ; return(i*100)})
    }
}