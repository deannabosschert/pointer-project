import {
  select,
  json,
  scaleLinear,
  scaleLog,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format
} from 'd3';

const graphHeader = 'Winstpercentage'
const yAxisLabelText = 'Population';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
  const variabele = data.percentageWinst
  // const statsOf = data[0].bedrijfsnaam

  const yValue = d => d['percentageWinst'];
  const xValue = d => d['bedrijfsnaam'];
  const margin = { top: 50, right: 40, bottom: 77, left: 180 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0]);

  const xScale = scaleBand()
    .domain(data.map(xValue))
    .range([0, innerWidth])
    .padding(0.15);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const yAxisTickFormat = number =>
    format('.3s')(number)
      .replace('G', 'B');

  const yAxis = axisLeft(yScale)
    .tickFormat(yAxisTickFormat)
    .tickSize(-innerWidth)
  	.tickPadding(10);
  	//.tickValues([200e6, 500e6, 750e6, 1e9, 1.3e9]);

  //g.append('g')
   // .call(axisLeft(yScale))
  //  .selectAll('.domain, .tick line')
 //   .remove();

  //?
//  g.append("g")
//    .call(axisLeft(yScale))
 // .selectAll("text")
 //   .attr("y", 0)
 //   .attr("x", 9)
 //   .attr("dy", ".35em")
 //   .attr("transform", "rotate(10)")
//    .selectAll('.domain, .tick line')
//    .remove()
//    .selectAll("text")
//    .attr("transform", "rotate(10)");
 //   .style("text-anchor", "start");


const renderedAxis = g.append("g")
    .call(axisBottom(xScale))
		.attr('transform', `translate(0, ${innerHeight})`);


renderedAxis.selectAll('.domain, .tick line')
   .remove();
renderedAxis.selectAll('text')
   .attr('transform', 'rotate(-45) translate(5)')
  		.attr('text-anchor', 'end');



  const yAxisG = g.append('g').call(yAxis)
    .attr('transform', `translate(0,0)`);

  yAxisG.select('.domain').remove();

  let yAxisLabelY = 50;
  let yAxisLabelX = -100;

  yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', yAxisLabelY)
      .attr('x', yAxisLabelX)
      .attr('fill', 'black')
  		.attr('transform', `rotate(-90,${yAxisLabelX},${yAxisLabelY})`)
      .text(yAxisLabelText);

  g.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('x', d => xScale(xValue(d)))
      .attr('height', d => innerHeight - yScale(yValue(d)))
      .attr('width', xScale.bandwidth())
  		.attr('transform', d=> `translate(0,${yScale(yValue(d))})`);

  g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
      .text(graphHeader)
  		.style('fill', 'darkorange');
};

// csv('data.csv').then(data => {
//   data.forEach(d => {
//     d.population = +d.population * 1000;
//   });
//   render(data);
// });

 dataOphalen()
	function dataOphalen() {

		let dutchPromise = loadDutchData()
    // let pointerPromise = loadPointerData()

		Promise.all([dutchPromise]).then(dutchRaw => {
		const dutchdata = flattenArray(dutchRaw)

    function flattenArray(array) {
   	 const result = array.flat()
     return result
 		 }

    const dataDutch = (prettifyArray(dutchdata))
    combineData(dataDutch)

   })

  function loadDutchData(dutchRaw) {
			return json('dutch-stats'+'.json').then(dutchRaw => {
  			return dutchRaw
			})
		}
}
		function prettifyArray(array) {
    return array.map(item => {
      return {
        jaar: item.jaar,
        bedrijfsnaam: item.bedrijfsnaam,
        percentageWinst: item.percentageWinst
    	  }
  	})}

function combineData(dataDutch){
  const selectedYear = 2017
  console.log(dataDutch)

  const dutchdata = dataDutch.find(data => {
    if (data.jaar === selectedYear){
      return {
        jaar: data.jaar,
        bedrijfsnaam: data.bedrijfsnaam,
        percentageWinst: data.percentageWinst
    	  }
    	}
  	})

  console.log(dutchdata)


  // render(data)
}


// function combineData(dataDutch){
//   const selectedYear = 2011
//   if (dataDutch.jaar === selectedYear){
//  		return {
//         jaar: item.jaar,
//         bedrijfsnaam: item.bedrijfsnaam,
//         percentageWinst: item.percentageWinst
//   	 }
//   }

//   console.log(dataDutch.jaar)
//   // render(data)
// }
