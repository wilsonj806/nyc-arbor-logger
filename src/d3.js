import * as d3 from 'd3'

// TODO make it vertically pannable
const genHorzBar = (xKey, yKey, idVal) => (data) => {
  const copy = [...data]

  d3.select('svg')
    .attr('width', '0')
    .remove()

  const margin = {top: 20, right: 110, bottom: 30, left: 110 }
  const width = 960 - margin.left - margin.right
  // const mod = data.length > 10 ? data.length * 18: 500
  // const height = mod - margin.top - margin.bottom
  const height = 500 - margin.top - margin.bottom

  const y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1);

  const x = d3.scaleLinear()
      .range([0, width])

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(idVal).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  // Scale the range of the data in the domains
  x.domain([0, d3.max(copy, function(d){ return d[xKey]; })])
  y.domain(copy.map(function(d) { return d[yKey]; }));
  //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

  // append the rectangles for the bar chart
  const bar = svg.selectAll(".bar")
    .data(copy, function(d) { return d })

  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  bar.enter().append("rect")
      // .attr('width', 0)
      // .transition()
    // .merge(bar)
      .attr("class", "bar")
      .attr('fill', function(d, i) { return colors(i) })
      // Add a transition so it doesn't do wonky shit???
      //.attr("x", function(d) { return x(d.sales); })
      .attr("width", function(d) {return x(d[xKey]); } )
      .attr("y", function(d) { return y(d[yKey]); })
      .attr("height", y.bandwidth());

    bar.exit()
      // .transition()
        // .attr('height', 0)
      .remove()

  // add the x Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
    .call(d3.axisLeft(y));
}
export default genHorzBar