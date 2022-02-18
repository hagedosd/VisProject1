class lineChartMajorPol {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 800,
            containerHeight: _config.containerHeight || 400,
            margin: _config.margin || {top: 25, right: 12, bottom: 30, left: 100},
      }

    this.data = _data;

    this.initVis();
    }
    
    /**
     * *******************************************************
     * *******************************************************
     * *******************************************************
     * Initialize scales/axes and append static ChartMajorPol elements
     * *******************************************************
     * *******************************************************
     * *******************************************************
     */
    initVis() {
        let vis = this;
        
        var keys = data.columns.slice(13);
        // console.log(keys);
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
    
        vis.xScale = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.Year; }))
            .range([ 0, vis.width ]);
    
        vis.yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([ vis.height, 0 ]);
  
        vis.colorScale = d3.scaleOrdinal()
            .domain(keys)
            // .range(['#6080b5', '#5a9866', '#f7dc7a', '#fc0303', '#fc8403', '#ec03fc']);
            .range(d3.schemeSet2);
      
  
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
  
   
        // Append group element that will contain our actual ChartMajorPol
        vis.ChartMajorPol = vis.svg
            .append("g")
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // Append empty x-axis group and move it to the bottom of the ChartMajorPol
        vis.xAxisG = vis.ChartMajorPol.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);
        
        // Append y-axis group
        vis.yAxisG = vis.ChartMajorPol.append('g')
            .attr('class', 'axis y-axis');
    
        // vis.stack = d3.stack()
        //     .keys(keys)
        //     (data);
  
    //   vis.axisTitle = vis.ChartMajorPolContainer.append('text')
    //       .attr('class', 'axis-label')
    //       .attr('y', -18)
    //       .attr('x', -25)
    //       .attr('dy', '0.35em')
    //       .text('Trillion m³');
  
        // // We need to make sure that the tracking area is on top of other ChartMajorPol elements
        // vis.marks = vis.ChartMajorPol.append('g');
        // vis.trackingArea = vis.ChartMajorPol.append('rect')
        //     .attr('width', vis.width)
        //     .attr('height', vis.height)
        //     .attr('fill', 'none')
        //     .attr('pointer-events', 'all');
    
        //     //(event,d) => {
    
        // // Empty tooltip group (hidden by default)
        // vis.tooltip = vis.ChartMajorPol.append('g')
        //     .attr('class', 'tooltip')
        //     .style('display', 'none');
    
        // vis.tooltip.append('text');
    }
  
    /**
     * **************************************************
     * **************************************************
     * **************************************************
     * Prepare the data and scales before we render it.
     * **************************************************
     * **************************************************
     * **************************************************
     */
    updateVis() {
        let vis = this;

        // vis.dayswAQI = d => d.dayswAQI;
        vis.xValue = d => d.Year;

        vis.yValue0 = d => (100 * d.CO/d.dayswAQI);
        vis.yValue1 = d => (100 * d.NO2/d.dayswAQI);
        vis.yValue2 = d => (100 * d.Ozone/d.dayswAQI);
        vis.yValue3 = d => (100 * d.SO2/d.dayswAQI);
        vis.yValue4 = d => (100 * d.PM2/d.dayswAQI);
        vis.yValue5 = d => (100 * d.PM10/d.dayswAQI);
  

        vis.CO_line = d3
            .line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue0(d)));
        
        vis.NO2_line = d3
            .line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue1(d)));

        vis.Ozone_line = d3
            .line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue2(d)));

        vis.SO2_line = d3
            .line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue3(d)));
        
        vis.PM2_line = d3
            .line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue4(d)));

        vis.PM10_line = d3
            .line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue5(d)));


        // Group the data per year
        // vis.groupedData = d3.groups(vis.data, d => d.Year);

        // vis.area = d3.area()
        //     .x((d,i) => vis.xScale(d.data.Year))
        //     .y0(d => vis.yScale(d[0]))
        //     .y1(d => vis.yScale(d[1]))
            //.curve(d3.curveStepAfter);
  
        // Set the scale input domains
        // vis.xScale.domain(d3.extent(vis.data, d => d.year));
        // vis.colorScale.domain([0,1,2]);
    
        // vis.bisectDate = d3.bisector(vis.xValue).left;
        vis.yAxis.tickFormat(d => `${d}%`);

        vis.renderVis();
    }
  
    /**
     * ***********************************************************************
     * ***********************************************************************
     * ***********************************************************************
     * This function contains the D3 code for binding data to visual elements
     * Important: the ChartMajorPol is not interactive yet and renderVis() is intended
     * to be called only once; otherwise new paths would be added on top
     * ***********************************************************************
     * ***********************************************************************
     * ***********************************************************************
     */
    renderVis() {
        let vis = this;
    
        // // Add line path
        // vis.ChartMajorPol.selectAll('.area-path')
        //     .data(vis.stack)
        //     .join('path').transition()
        //         .attr('class', 'area-path')
        //         .attr('d', vis.area)
        //         .attr('fill', d => vis.colorScale(d.key));

        vis.ChartMajorPol
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.CO_line)
            .attr("stroke", "black");

        vis.ChartMajorPol
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.NO2_line)
            .attr("stroke", "red");

        vis.ChartMajorPol
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.Ozone_line)
            .attr("stroke", "blue");

        vis.ChartMajorPol
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.SO2_line)
            .attr("stroke", "purple");

        vis.ChartMajorPol
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.PM2_line)
            .attr("stroke", "green");

        vis.ChartMajorPol
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.PM10_line)
            .attr("stroke", "orange");

    
        //   vis.axisTitle.style('display', vis.config.displayType == 'absolute' ? 'block' : 'none');
        // vis.trackingArea
        //     .on('mouseenter', () => {
        //         vis.tooltip.style('display', 'block');
        //     })
        //     .on('mouseleave', () => {
        //         vis.tooltip.style('display', 'none');
        //     })
        //     .on('mousemove', function(event) {
        //         // Get date that corresponds to current mouse x-coordinate
        //         const xPos = d3.pointer(event, this)[0]; // First array element is x, second is y
        //         const date = vis.xScale.invert(xPos);
    
        //         // Find nearest data point
        //         const index = vis.bisectDate(vis.data, date, 1);
        //         const a = vis.data[index - 1];
        //         const b = vis.data[index];
        //         const d = b && (date - a.date > b.date - date) ? b : a; 
    
        //         // Update tooltip
        //         vis.tooltip.select('circle')
        //             .attr('transform', `translate(${vis.xScale(d.date)},${vis.yScale(d.close)})`);
                
        //         vis.tooltip.select('text')
        //             .attr('transform', `translate(${vis.xScale(d.date)},${(vis.yScale(d.close) - 15)})`)
        //             .text(Math.round(d.close));
        //     });
        // Update the axes
        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
    }
  }