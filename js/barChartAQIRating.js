class barChartAQIRating {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 800,
            containerHeight: _config.containerHeight || 400,
            margin: _config.margin || {top: 50, right: 10, bottom: 30, left: 110},
            tooltipPadding: _config.tooltipPadding || 15
  
      }
  
    this.data = _data;
    // this.data = data[41]; 

    this.initVis();
    }
    initVis() {
        let vis = this;

        // console.log(data[41]);
        vis.keys = data.columns.slice(4, 9);
        let categories = ['Good', 'Moderate', 'Sensitive', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];
        // console.log(keys);
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([ 0, vis.width ]);
    
        vis.yScale = d3.scaleBand()
            // .domain(vis.keys)
            .domain(categories)
            .range([0, vis.height])
            .paddingInner(0.15);


        // Initialize axes
        vis.xAxis = d3.axisBottom(vis.xScale)
            // .tickFormat(d3.format("d")); // Remove thousand comma
            .ticks(6)
            .tickSizeOuter(0)
            .tickPadding(10);

        vis.yAxis = d3.axisLeft(vis.yScale)
            // .tickSize(-vis.width)
            // .tickPadding(10);
            .ticks(6)
            .tickSizeOuter(0)
            .tickPadding(10);

        
        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);


        // Append group element that will contain our actual chartAQIRating
        vis.chartAQIRating = vis.svg
        .append("g")
        .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // Append empty x-axis group and move it to the bottom of the chartAQIRating
        vis.xAxisG = vis.chartAQIRating.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);
            // .attr("transform", "translate(0," + vis.height + ")")
        
        // Append y-axis group
        vis.yAxisG = vis.chartAQIRating.append('g')
            .attr('class', 'axis y-axis');

        //axes titles
        vis.chartAQIRating.append("text")
            .attr("text-anchor", "end")
            .attr("x", vis.width/2 +50)
            .attr("y", vis.height+30)
            .attr("font-size","16px")
            .text("% of Year");

        vis.chartAQIRating.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -vis.config.margin.left+15)
            .attr("x", -vis.config.margin.top -60 )
            .attr("font-size","16px")
            .text("AQI Category");

        // Chart title
        vis.svg.append("text")
            .attr("x", (vis.width / 2) + 90)             
            .attr("y", 0 - (vis.config.margin.top / 2) + 50)
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text("Prevalence of AQI Categories 2021");

    }

    updateVis() {
        let vis = this;
        
        // vis.xValue = d => d.Good;

        // vis.yValue0 = d => d.MaxAQI;
        // vis.yValue1 = d => d.MedianAQI;
        // vis.yValue2 = d => d.NinteyAQI;

        vis.chartAQIRating.append("rect")
            .data([vis.data])
            .attr('class', 'chart-bar')
            .attr('width', d => (100 * vis.xScale(d.Good) / d.dayswAQI))
            .attr('height', vis.yScale.bandwidth())
            .attr('y', vis.yScale("Good"))
            .attr('x',0);

        vis.chartAQIRating.append("rect")
            .data([vis.data])
            .attr('class', 'chart-bar')
            .attr('width', d => (100 * vis.xScale(d.Moderate) / d.dayswAQI))
            .attr('height', vis.yScale.bandwidth())
            .attr('y', vis.yScale("Moderate"))
            .attr('x',0);

        vis.chartAQIRating.append("rect")
            .data([vis.data])
            .attr('class', 'chart-bar')
            .attr('width', d => (100 * vis.xScale(d.SensGrp) / d.dayswAQI))
            .attr('height', vis.yScale.bandwidth())
            .attr('y', vis.yScale("Sensitive"))
            .attr('x',0);

        vis.chartAQIRating.append("rect")
            .data([vis.data])
            .attr('class', 'chart-bar')
            .attr('width', d => (100 * vis.xScale(d.Unhealthy) / d.dayswAQI))
            .attr('height', vis.yScale.bandwidth())
            .attr('y', vis.yScale("Unhealthy"))
            .attr('x',0);

            vis.chartAQIRating.append("rect")
            .data([vis.data])
            .attr('class', 'chart-bar')
            .attr('width', d => (100 * vis.xScale(d.veryUnhealthy) / d.dayswAQI))
            .attr('height', vis.yScale.bandwidth())
            .attr('y', vis.yScale("Very Unhealthy"))
            .attr('x',0);

            vis.chartAQIRating.append("rect")
            .data([vis.data])
            .attr('class', 'chart-bar')
            .attr('width', d => (100 * vis.xScale(d.Hazardous) / d.dayswAQI))
            .attr('height', vis.yScale.bandwidth())
            .attr('y', vis.yScale("Hazardous"))
            .attr('x',0);

        // Update the axes
        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);


        // vis.renderVis();
    }

    // renderVis() {
    //     let vis = this;

    //     vis.chartAQIRating.append("rect")
    //         .data([vis.data])
    //         .attr('class', 'chart-bar')
    //         .attr('width', d => (100 * vis.xScale(d.Good) / d.dayswAQI))
    //         .attr('height', vis.yScale.bandwidth())
    //         .attr('y', vis.yScale("Good"))
    //         .attr('x',0);

    //     vis.chartAQIRating.append("rect")
    //         .data([vis.data])
    //         .attr('class', 'chart-bar')
    //         .attr('width', d => (100 * vis.xScale(d.Moderate) / d.dayswAQI))
    //         .attr('height', vis.yScale.bandwidth())
    //         .attr('y', vis.yScale("Moderate"))
    //         .attr('x',0);

    //     vis.chartAQIRating.append("rect")
    //         .data([vis.data])
    //         .attr('class', 'chart-bar')
    //         .attr('width', d => (100 * vis.xScale(d.SensGrp) / d.dayswAQI))
    //         .attr('height', vis.yScale.bandwidth())
    //         .attr('y', vis.yScale("Sensitive"))
    //         .attr('x',0);

    //     vis.chartAQIRating.append("rect")
    //         .data([vis.data])
    //         .attr('class', 'chart-bar')
    //         .attr('width', d => (100 * vis.xScale(d.Unhealthy) / d.dayswAQI))
    //         .attr('height', vis.yScale.bandwidth())
    //         .attr('y', vis.yScale("Unhealthy"))
    //         .attr('x',0);

    //         vis.chartAQIRating.append("rect")
    //         .data([vis.data])
    //         .attr('class', 'chart-bar')
    //         .attr('width', d => (100 * vis.xScale(d.veryUnhealthy) / d.dayswAQI))
    //         .attr('height', vis.yScale.bandwidth())
    //         .attr('y', vis.yScale("Very Unhealthy"))
    //         .attr('x',0);

    //         vis.chartAQIRating.append("rect")
    //         .data([vis.data])
    //         .attr('class', 'chart-bar')
    //         .attr('width', d => (100 * vis.xScale(d.Hazardous) / d.dayswAQI))
    //         .attr('height', vis.yScale.bandwidth())
    //         .attr('y', vis.yScale("Hazardous"))
    //         .attr('x',0);

    //     // Update the axes
    //     vis.xAxisG.call(vis.xAxis);
    //     vis.yAxisG.call(vis.yAxis);
    // }
}