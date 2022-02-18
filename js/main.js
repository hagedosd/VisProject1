 d3.csv('data/hamilton.csv') //ASYNCHRONOUS LOADING
  .then(_data => {
	console.log('Data loading complete. Work with dataset.');
	data = _data;
	

    //process the data - this is a forEach function.  You could also do a regular for loop.... 
    data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
      	// d.Year = +d.Year; // convert string 'Year' to number
		// d.MaxAQI = +d.MaxAQI; // convert string 'MaxAQI' to number
		d.ninetyPercent = d['90th Percentile AQI'];

		d.CO = d['Days CO'];
		d.NO2 = d['Days NO2'];
		d.Ozone = d['Days Ozone'];
		d.SO2 = d['Days SO2'];
		d.PM2 = d['Days PM2.5'];
		d.PM10 = d['Days PM10'];
		d.dayswAQI = d['Days with AQI'];
		
		// d.dayswoAQI = (((d.dayswAQI == 365) || (d.dayswAQI == 366)) ? 0 : 365 - d.dayswAQI);
		// console.log("Days with AQI:", d.dayswAQI);
		// console.log("Days without AQI:", d.dayswoAQI);


		d.Good = d['Good Days'];
		d.Moderate = d['Moderate Days'];
		d.SensGrp = d['Unhealthy for Sensitive Groups Days'];
		d.Unhealthy = d['Unhealthy Days'];
		d.veryUnhealthy = d['Very Unhealthy Days'];
		d.Hazardous = d['Hazardous Days'];
  	});
	
	// Create an instance (for example in main.js)
	const lineChartAQI1 = new lineChartAQI({
		'parentElement': '#AQI'
	}, data);
	lineChartAQI1.updateVis();

	const lineChartMajorPol1 = new lineChartMajorPol({
		'parentElement': '#MajorPol'
	}, data);
	lineChartMajorPol1.updateVis();

	const lineChartNoAQI1 = new lineChartNoAQI({
		parentElement: '#NoAQI'
	}, data);
	lineChartNoAQI1.updateVis();

	const barChartAQIRating1 = new barChartAQIRating({
		'parentElement': '#AQIRating'
	}, data[41]);
	barChartAQIRating1.updateVis();

	const barChartMainPol1 = new barChartMainPol({
		'parentElement': '#MainPol2021'
	}, data[41]);
	barChartMainPol1.updateVis();

  	})
  	.catch(error => {
    console.error('Error loading the data', error);
  	});

//Issues:
//No titles or axes labels
//No legends
//Bar charts do not show up
//Error for line chart 3 and bar charts based on .data([vis.data]) line
//Charts are not interactive
//Only hamilton county