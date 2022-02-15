class lineChart {
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
        //setting up the chart- things that won't need to update on user actions
  
        console.log("Let's draw a chart!!");
  
        let vis = this; 
    
  
        // Width and height as the inner dimensions of the chart area- as before
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;


        // Initialize linear scales (input domain and output range)
        vis.xScale = d3.scaleLinear()
            // .domain([1980, 2021])
            .range([0, vis.width]);


        vis.yScale = d3.scaleLinear()
            .domain([0, d3.max(vis.data, d => d.MaxAQI)]) 
            .range([vis.height, 0])
            .nice();


        // Initialize axes
        vis.xAxis = d3.axisBottom(vis.xScale)
            .tickFormat(d3.format("d"));

        vis.yAxis = d3.axisLeft(vis.yScale);
  

        // Define 'svg' as a child-element (g) from the drawing area and include spaces
        // Add <svg> element (drawing space)
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight)
  

        // Append group element that will contain our actual chart (see margin convention)
        vis.linechart = vis.svg
            .append("g")
            .attr(
                "transform",
                `translate(${vis.config.margin.left},${vis.config.margin.top})`
            );


        // Append empty x-axis group and move it to the bottom of the chart
        vis.xAxisG = vis.linechart
            .append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0,${vis.height})`);

        // Append y-axis group
        vis.yAxisG = vis.linechart.append("g")
            .attr("class", "axis y-axis");
    }
  
  
    updateVis() {
        let vis = this;
    
        vis.xValue = d => d.Year;
        
        vis.yValue = d => d.MaxAQI;
        vis.newYValue = d => d.MedianAQI;
        vis.ninetyPercent = d => d.ninetyPercent;

        vis.MaxAQI_line = d3
            .line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue(d)));
        
        vis.MedianAQI_line = d3
            .line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.newYValue(d)));

        vis.NinetyAQI_line = d3
            .line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.ninetyPercent(d)));

        // Set the scale input domains
        vis.xScale.domain(d3.extent(vis.data, vis.xValue));
        // vis.yScale.domain(d3.extent(vis.data, vis.yValue));
           
        vis.renderVis();
   }
  
    renderVis() { 
        let vis = this;

        // const line = d3.line()
        //     .x(d => d.year)
        //     .y(d => d.MaxAQI);

        // Add line path
        vis.linechart
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.MaxAQI_line)
            .attr("stroke", "black");

        vis.linechart
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.MedianAQI_line)
            .attr("stroke", "red");

        vis.linechart
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.NinetyAQI_line)
            .attr("stroke", "blue");
        
        
        // Update the axes
        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
  
    }
}