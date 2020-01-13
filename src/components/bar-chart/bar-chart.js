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
} from 'd3'

const graphHeader = 'Winstpercentage'
const svg = select('svg')

const width = +svg.attr('width')
const height = +svg.attr('height')

function render(dataDutch){
  const dataP = dataDutch
  // const variabele = data[0].percentageWinst //{vuenaam meegegeven uit de lijst}
  // const statsOf = data[0].bedrijfsnaam //this.bedrijfsnaam
	console.log(dataP)


  const yValue = d => d['percentageWinst']
  const xValue = d => d['bedrijfsnaam']
  const margin = { top: 50, right: 40, bottom: 77, left: 180 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const yScale = scaleLinear()
    .domain([0, max(dataP, yValue)])
    .range([innerHeight, 0])

  const xScale = scaleBand()
    .domain(dataP.map(xValue))
    .range([0, innerWidth])
    .padding(0.15)

  const g = svg.append('g')
    .attr('transform', 		`translate(${margin.left},${margin.top})`)

  const yAxisTickFormat = number =>
    format('')(number)
      .replace('G', 'B')

  const yAxis = axisLeft(yScale)
    .tickFormat(yAxisTickFormat)
    .tickSize(-innerWidth)
  	.tickPadding(10)

	const renderedAxis = g.append("g")
    .call(axisBottom(xScale))
		.attr('transform', `translate(0, ${innerHeight})`)


	renderedAxis.selectAll('.domain, .tick line')
   .remove()
	renderedAxis.selectAll('text')
   .attr('transform', 'translate(5)')
  		.attr('text-anchor', 'middle')


  const yAxisG = g.append('g').call(yAxis)
    .attr('transform', `translate(0,0)`)

  yAxisG.select('.domain').remove()

  g.selectAll('rect').data(dataP)
    .enter().append('rect')
      .attr('x', d => xScale(xValue(d)))
      .attr('height', d => innerHeight - yScale(yValue(d)))
      .attr('width', xScale.bandwidth())
  		.attr('transform', d=> `translate(0,${yScale(yValue(d))})`)

  g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
      .text(graphHeader)
  		.style('fill', '#1d2939')
}

//     Promise.all([dutchPromise, pointerPromise]).then(dutchRaw, pointerRaw => {
//     const pointerdata = flattenArray(pointerRaw)

// 		})
//   }

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
    render(dataDutch)

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

// function loadPointerData(pointerdata){
//    return json('pointer'+'.json').then(dutchdata => {
//   	return dutchdata
// 		})
// }
