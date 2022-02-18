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
		d.days = d['Days with AQI'];
  	});
	
	// Create an instance (for example in main.js)
	const lineChartAQI1 = new lineChartAQI({
		'parentElement': '#AQI',
		// 'containerHeight': 1100,
		// 'containerWidth': 1000
	}, data);
	lineChartAQI1.updateVis();

	const lineChartMajorPol1 = new lineChartMajorPol({
		'parentElement': '#MajorPol'
	}, data);
	lineChartMajorPol1.updateVis();


  	})
  	.catch(error => {
    console.error('Error loading the data', error);
  	});
