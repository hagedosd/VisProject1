d3.csv('data/data.csv') //ASYNCHRONOUS LOADING
	// filter using a for loop going thru an array of the 2 counties
	//
  	.then(_data => {
		console.log('Data loading complete. Work with dataset.');
		// data = _data;
		

		//process the data - this is a forEach function.  You could also do a regular for loop.... 
		_data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
			// d.County = +d.County;
			// d.State = +d.Sate;
			d.MaxAQI = d['Max AQI'];
			d.MedianAQI = d['Median AQI'];
			d.ninetyPercent = d['90th Percentile AQI'];


			d.CO = d['Days CO'];
			d.NO2 = d['Days NO2'];
			d.Ozone = d['Days Ozone'];
			d.SO2 = d['Days SO2'];
			d.PM2 = d['Days PM2.5'];
			d.PM10 = d['Days PM10'];
			d.dayswAQI = d['Days with AQI'];


			d.Good = d['Good Days'];
			d.Moderate = d['Moderate Days'];
			d.SensGrp = d['Unhealthy for Sensitive Groups Days'];
			d.Unhealthy = d['Unhealthy Days'];
			d.veryUnhealthy = d['Very Unhealthy Days'];
			d.Hazardous = d['Hazardous Days'];
  		});
	// let select = document.getElementById('county-left');
	// let option = select.options[select.selectedIndex];
	// console.log(option.value);
	// console.log(option.text);
	data = _data;
	let onLoadDataLeft = data.filter(d => d.County === "Hamilton" && d.State === "Ohio");
	let onLoadDataRight = data.filter(d => d.County === "Orange" && d.State ==="California");
	let countback = 1;

	// Left instances of Vis 1-5
	lineChartAQI1 = new lineChartAQI({
		'parentElement': '#AQI'
	}, onLoadDataLeft);
	lineChartAQI1.updateVis();

	lineChartMajorPol1 = new lineChartMajorPol({
		'parentElement': '#MajorPol'
	}, onLoadDataLeft);
	lineChartMajorPol1.updateVis();

	lineChartNoAQI1 = new lineChartNoAQI({
		parentElement: '#NoAQI'
	}, onLoadDataLeft);
	lineChartNoAQI1.updateVis();

	barChartAQIRating1 = new barChartAQIRating({
		'parentElement': '#AQIRating'
	}, onLoadDataLeft);
	barChartAQIRating1.updateVis(countback);

	barChartMainPol1 = new barChartMainPol({
		'parentElement': '#MainPol'
	}, onLoadDataLeft);
	barChartMainPol1.updateVis(countback);


	// Right instances of Vis 1-5
	lineChartAQI2 = new lineChartAQI({
		'parentElement': '#AQI2'
	}, onLoadDataRight);
	lineChartAQI2.updateVis();

	lineChartMajorPol2 = new lineChartMajorPol({
		'parentElement': '#MajorPol2'
	}, onLoadDataRight);
	lineChartMajorPol2.updateVis();

	lineChartNoAQI2 = new lineChartNoAQI({
		parentElement: '#NoAQI2'
	}, onLoadDataRight);
	lineChartNoAQI2.updateVis();

	barChartAQIRating2 = new barChartAQIRating({
		'parentElement': '#AQIRating2'
	}, onLoadDataRight);
	barChartAQIRating2.updateVis(countback);

	barChartMainPol2 = new barChartMainPol({
		'parentElement': '#MainPol2'
	}, onLoadDataRight);
	barChartMainPol2.updateVis(countback);

  	})
  	.catch(error => {
    console.error('Error loading the data', error);
  	});


function updateLeftOnSelect(value) {
	let countyAndState = value.split(" ");
	let county = countyAndState[0];
	let state = countyAndState[1];

	let onUpdateDataLeft = data.filter(d => d.County === county && d.State === state);
	console.log(onUpdateDataLeft);

	lineChartAQI1.data = onUpdateDataLeft;
	lineChartMajorPol1.data = onUpdateDataLeft;
	lineChartNoAQI1.data = onUpdateDataLeft;
	barChartAQIRating1.data = onUpdateDataLeft;
	barChartMainPol1.data = onUpdateDataLeft;

	lineChartAQI1.updateVis();
	lineChartMajorPol1.updateVis();
	lineChartNoAQI1.updateVis();
	barChartAQIRating1.updateVis();
	barChartMainPol1.updateVis();
}
	
function updateRightOnSelect(value) {
	let countyAndState = value.split(" ");
	let county = countyAndState[0];
	let state = countyAndState[1];

	let onUpdateDataRight = data.filter(d => d.County === county && d.State === state);

	lineChartAQI2.data = onUpdateDataRight;
	lineChartMajorPol2.data = onUpdateDataRight;
	lineChartNoAQI2.data = onUpdateDataRight;
	barChartAQIRating2.data = onUpdateDataRight;
	barChartMainPol2.data = onUpdateDataRight;

	lineChartAQI2.updateVis();
	lineChartMajorPol2.updateVis();
	lineChartNoAQI2.updateVis();
	barChartAQIRating2.updateVis();
	barChartMainPol2.updateVis();
}

function updateBarCharts() {
	var year = document.getElementById("barChartYear").value;
	// console.log("This is the year for bar charts: ", year);
	countback = 2022 - year;
	barChartAQIRating2.updateVis(countback);
	barChartMainPol2.updateVis(countback);
}
//Issues:
//Charts are not interactive
//Only hamilton county
//dynamically update based on dropdown