d3.csv('data/data.csv') //ASYNCHRONOUS LOADING
	// filter using a for loop going thru an array of the 2 counties
	//
  	.then(_data => {
		console.log('Data loading complete. Work with dataset.');
		data = _data;
		

		//process the data - this is a forEach function.  You could also do a regular for loop.... 
		data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
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
	
	let onLoadDataLeft = data.filter(d => d.County == "Hamilton" && d.State == "Ohio");
	let onLoadDataRight = data.filter(d => d.County == "Los Angeles" && d.State == "California");

	// Left instances of Vis 1-5
	const lineChartAQI1 = new lineChartAQI({
		'parentElement': '#AQI'
	}, onLoadDataLeft);
	lineChartAQI1.updateVis();

	const lineChartMajorPol1 = new lineChartMajorPol({
		'parentElement': '#MajorPol'
	}, onLoadDataLeft);
	lineChartMajorPol1.updateVis();

	const lineChartNoAQI1 = new lineChartNoAQI({
		parentElement: '#NoAQI'
	}, onLoadDataLeft);
	lineChartNoAQI1.updateVis();

	const barChartAQIRating1 = new barChartAQIRating({
		'parentElement': '#AQIRating'
	}, onLoadDataLeft);
	barChartAQIRating1.updateVis();

	const barChartMainPol1 = new barChartMainPol({
		'parentElement': '#MainPol'
	}, onLoadDataLeft);
	barChartMainPol1.updateVis();


	// Right instances of Vis 1-5
	const lineChartAQI2 = new lineChartAQI({
		'parentElement': '#AQI2'
	}, onLoadDataRight);
	lineChartAQI2.updateVis();

	const lineChartMajorPol2 = new lineChartMajorPol({
		'parentElement': '#MajorPol2'
	}, onLoadDataRight);
	lineChartMajorPol2.updateVis();

	const lineChartNoAQI2 = new lineChartNoAQI({
		parentElement: '#NoAQI2'
	}, onLoadDataRight);
	lineChartNoAQI2.updateVis();

	const barChartAQIRating2 = new barChartAQIRating({
		'parentElement': '#AQIRating2'
	}, onLoadDataRight);
	barChartAQIRating2.updateVis();

	const barChartMainPol2 = new barChartMainPol({
		'parentElement': '#MainPol2'
	}, onLoadDataRight);
	barChartMainPol2.updateVis();

  	})
  	.catch(error => {
    console.error('Error loading the data', error);
  	});

	
function updateRightOnSelect(value) {
	console.log("This is the county: ", value);
	let countyAndState = value.split(" ");
	let county = countyAndState[0];
	let state = countyAndState[1];

	let onUpdateDataRight = data.filter(d => d.County == county && d.State == state);

	lineChartAQI2.data() = onUpdateDataRight;
	lineChartMajorPol2.data() = onUpdateDataRight;
	lineChartNoAQI2.data() = onUpdateDataRight;
	barChartAQIRating2.data() = onUpdateDataRight;
	barChartMainPol2.data() = onUpdateDataRight;

	lineChartAQI2.updateVis();
	lineChartMajorPol2.updateVis();
	lineChartNoAQI2.updateVis();
	barChartAQIRating2.updateVis();
	barChartMainPol2.updateVis();

	// Right instances of Vis 1-5
	// const lineChartAQI2 = new lineChartAQI({
	// 	'parentElement': '#AQI2'
	// }, onUpdateDataRight);
	// lineChartAQI2.updateVis();

	// const lineChartMajorPol2 = new lineChartMajorPol({
	// 	'parentElement': '#MajorPol2'
	// }, onUpdateDataRight);
	// lineChartMajorPol2.updateVis();

	// const lineChartNoAQI2 = new lineChartNoAQI({
	// 	parentElement: '#NoAQI2'
	// }, onUpdateDataRight);
	// lineChartNoAQI2.updateVis();

	// const barChartAQIRating2 = new barChartAQIRating({
	// 	'parentElement': '#AQIRating2'
	// }, onUpdateDataRight);
	// barChartAQIRating2.updateVis();

	// const barChartMainPol2 = new barChartMainPol({
	// 	'parentElement': '#MainPol2'
	// }, onUpdateDataRight);
	// barChartMainPol2.updateVis();
}
//Issues:
//Charts are not interactive
//Only hamilton county
//dynamically update based on dropdown