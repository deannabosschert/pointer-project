<template>
      <svg width="960" height="500"></svg>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { SET_CURRENT_CARECOMPANY } from '~/store/mutation-types'

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
  } from "d3"

  const dataset1 = "dutch-stats"
  const dataset2 = "pointer"
  const selectedYear = 2011
  const selectedCompany = "x9cmx8zzck"
  const variabele = "percentageWinst"

  const graphHeader = "Winstpercentage"
  const yAxisLabelText = "%"

  const svg = select("svg")

  const width = +svg.attr("width")
  const height = +svg.attr("height")

  const render = data => {
    const statsOf = "naam"

    const yValue = d => d[variabele]
    const xValue = d => d[statsOf]
    const margin = { top: 50, right: 40, bottom: 77, left: 180 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const yScale = scaleLinear()
      .domain([0, max(data, yValue)])
      .range([innerHeight, 0])

    const xScale = scaleBand()
      .domain(data.map(xValue))
      .range([0, innerWidth])
      .padding(0.15)

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // twee getallen achter de komma bij procentenlabel(y-as)
    const yAxisTickFormat = number => format(".3s")(number).replace("G", "B")

    const yAxis = axisLeft(yScale)
      .tickFormat(yAxisTickFormat)
      .tickSize(-innerWidth)
      .tickPadding(10)

    const renderedAxis = g
      .append("g")
      .call(axisBottom(xScale))
      .attr("transform", `translate(0, ${innerHeight})`)

    renderedAxis.selectAll(".domain, .tick line").remove()
    renderedAxis.selectAll("text").attr("text-anchor", "end")

    const yAxisG = g
      .append("g")
      .call(yAxis)
      .attr("transform", `translate(0,0)`)

    yAxisG.select(".domain").remove()

    let yAxisLabelY = 50
    let yAxisLabelX = -100

    yAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", yAxisLabelY)
      .attr("x", yAxisLabelX)
      .attr("fill", "black")
      .attr("transform", `rotate(-90,${yAxisLabelX},${yAxisLabelY})`)
      .text(yAxisLabelText)

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(xValue(d)))
      .attr("height", d => innerHeight - yScale(yValue(d)))
      .attr("width", xScale.bandwidth())
      .attr("transform", d => `translate(0,${yScale(yValue(d))})`)

    g.append("text")
      .attr("class", "title")
      .attr("y", -10)
      .text(graphHeader)
      .style("fill", "#1d2939")
  }

  dataOphalen()
  function dataOphalen() {
    Promise.all([loadData(dataset1), loadData(dataset2)]).then(
      ([dutchdata, pointerdata]) => {
        const pointerstats = pointerdata.x9cmx8zzck.jaarVerslagen[selectedYear]
        const dutchstats = dutchdata[selectedYear]

        const data = [pointerstats, dutchstats]
        render(data)
      }
    )

    function loadData(dataset) {
      return json(dataset + ".json").then(data => {
        return data
      })
    }
  }




</script>

<style lang="scss">
body {
  margin: 0px;
  overflow: hidden;
}

rect {
  fill: #1beaae;
  width: 80px;
}

text {
  font-family: sans-serif;
}

.tick text {
  font-size: 18px;
  fill: #635F5D;
}

.tick line {
  stroke: #C0C0BB;
}

.title {
  color: #635F5D;
  width: 130px;
  height: 23px;
  font-family: "Tenso", Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
}


</style>
