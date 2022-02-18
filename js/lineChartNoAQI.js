class lineChartNoAQI {
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

    initVis(){
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
    
        vis.xScale = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.Year; }))
            .range([ 0, vis.width ]);
    
        vis.yScale = d3.scaleLinear()
            // .domain([0, 366])
            .domain(d3.extent(data, function(d) { return d.dayswAQI; }))
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
            .attr('transform', `translate(0,${vis.height})`);
        
        // Append y-axis group
        vis.yAxisG = vis.chartNoAQI.append('g')
            .attr('class', 'axis y-axis');
    }

    updateVis() {
        let vis = this;

        vis.xValue = d => d.Year;
        // vis.yValue = d => ((d.dayswAQI == 365 || 366) ? 
        //     d.dayswoAQI = 0 : d.dayswoAQI = 365 - dayswAQI);
        vis.yValue = d => d.dayswAQI

        vis.dayswoAQI = d3
            .line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue(d)));

        vis.renderVis();
    }

    renderVis() {
        let vis = this;

        vis.chartNoAQI
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.dayswAQI)
            .attr("stroke", "black");

        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
    }

}