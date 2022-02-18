class lineChartAQI {
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
    
        var keys = data.columns.slice(10, 12);

        // Width and height as the inner dimensions of the chart area- as before
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;


        // Initialize linear scales (input domain and output range)
        vis.xScale = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.Year; }))
            .range([0, vis.width]);


        vis.yScale = d3.scaleLinear()
            .domain([0, d3.max(vis.data, d => d.MaxAQI)]) 
            .range([vis.height, 0])
            .nice();

        vis.colorScale = d3.scaleOrdinal()
            .domain(keys)
            .range(['#6080b5', '#5a9866', '#f7dc7a']);


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
        vis.ChartAQI = vis.svg
            .append("g")
            .attr(
                "transform",
                `translate(${vis.config.margin.left},${vis.config.margin.top})`
            );


        // Append empty x-axis group and move it to the bottom of the chart
        vis.xAxisG = vis.ChartAQI
            .append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0,${vis.height})`);

        
        // Append y-axis group
        vis.yAxisG = vis.ChartAQI.append("g")
            .attr("class", "axis y-axis");

        // We need to make sure that the tracking area is on top of other chart elements
        vis.marks = vis.ChartAQI.append('g');
        vis.trackingArea = vis.ChartAQI.append('rect')
            .attr('width', vis.width)
            .attr('height', vis.height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all');
    
        // Empty tooltip group (hidden by default)
        vis.tooltip = vis.ChartAQI.append('g')
            .attr('class', 'tooltip')
            .style('display', 'none');
    
        vis.tooltip.append('text');
    }
  
  
    updateVis() {
        let vis = this;
    
        vis.xValue = d => d.Year;
        
        vis.yValue = d => d.MaxAQI;
        vis.newYValue = d => d.MedianAQI;
        vis.ninetyPercent = d => d.ninetyPercent;


        // // Group the data per year
        // vis.groupedData = d3.groups(vis.data, d => d.Year);

        // vis.line = d3.line()
        //     .x(d => vis.xScale(d.Year))
        //     .y(d => vis.yScale(keys));


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
        // vis.xScale.domain(d3.extent(vis.data, vis.xValue));
        // vis.yScale.domain(d3.extent(vis.data, vis.yValue));
           
        vis.bisectDate = d3.bisector(vis.xValue).left;

        vis.renderVis();
   }
  
    renderVis() { 
        let vis = this;

        // const line = d3.line()
        //     .x(d => d.year)
        //     .y(d => d.MaxAQI);


        // // Add line path
        // vis.ChartAQI.selectAll('.line-path')
        //     .data(vis.groupedData)
        //     .join('path').transition()
        //         .attr('class', 'chart-line')
        //         .attr('d', vis.line)
        //         .attr('fill', d => vis.colorScale(d.key));


        // Add line path
        vis.ChartAQI
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.MaxAQI_line)
            .attr("stroke", "black");

        vis.ChartAQI
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.MedianAQI_line)
            .attr("stroke", "red");

        vis.ChartAQI
            .append("path")
            .data([vis.data])
            .attr("class", "chart-line")
            .attr("d", vis.NinetyAQI_line)
            .attr("stroke", "blue");
        

        //   vis.axisTitle.style('display', vis.config.displayType == 'absolute' ? 'block' : 'none');
        vis.trackingArea
            .on('mouseenter', () => {
                vis.tooltip.style('display', 'block');
            })
            .on('mouseleave', () => {
                vis.tooltip.style('display', 'none');
            })
            .on('mousemove', function(event) {
                // Get date that corresponds to current mouse x-coordinate
                const xPos = d3.pointer(event, this)[0]; // First array element is x, second is y
                const year = vis.xScale.invert(xPos);

                // Find nearest data point
                const index = vis.bisectDate(vis.data, year, 1);
                const a = vis.data[index - 1];
                const b = vis.data[index];
                const d = b && (year - a.year > b.year - year) ? b : a; 
                // const d = year;

                // Update tooltip
                // vis.tooltip.select('circle')
                //     .attr('transform', `translate(${vis.xScale(d.Year)},${vis.yScale(d.MaxAQI)})`);
            
                vis.tooltip.select('text')
                    .attr('transform', `translate(${vis.xScale(d.Year)},${(vis.yScale(d.MaxAQI) - 15)})`)
                    .style('display', 'block')
                    .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')   
                    .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
                    .text(d.MaxAQI);
                    // .html(`<div>
                    //     <li>Max AQI: ${d.MaxAQI}</li>
                    //     <li>Median AQI: ${d.MedianAQI}</li>
                    //     <li>90th Percentile AQI: ${d.ninetyPercent}</li>
                    // </div>
                    // `);
        });
        
        // Update the axes
        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
  
    }
}