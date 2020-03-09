// Define SVG area dimensions
let svgWidth = 1370;
let svgHeight = 660;

// Define the chart's margins as an object
let chartMargin = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40
};

// Bring in toolTip to make it an interactive visual 
let toolTip = d3.select("body")
      .append("div")
      .classed("my-tooltip", true);
      // .style("opacity", 0);

// Define dimensions of the chart area
let chartWidth = svgWidth - chartMargin.left - chartMargin.right;
let chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
let svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
 

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
let chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from CSV
d3.csv("../missing_per_state.csv").then(function(state) {

  // Print the state and count of missing persons in each 
  //console.log(state);


  state.forEach(function(data) {
    data.count = +data.count;
    console.log(data.count)
  });


  // Create axes 

  let xScale = d3.scaleBand()
    .domain(state.map(d => d.state_last_seen))
    .range([0, chartWidth])
    .padding(0.4);

  yScale = d3.scaleLinear([0, d3.max(state, row => row.count)], [chartHeight, 0]);

 let xAxis = d3.axisBottom(xScale);
 let yAxis = d3.axisLeft(yScale).tickValues(yScale.ticks().concat(yScale.domain()));

 // Append axes
 chartGroup.append("g")
   .attr("transform", `translate(0, ${chartHeight})`)
   .call(xAxis);

 chartGroup.append("g")
   .call(yAxis);

  let barSpacing = 5; // desired space between each bar

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  let barWidth = (chartWidth - (barSpacing * (state.length - 1))) / state.length;

  svg.append("text")
  .attr("x", 700 )
  .attr("y",  30 )
  .style("text-anchor", "middle")
  .text("Missing Person by State/U.S. Territory");


  // @TODO
  // Create code to build the bar chart using the state data.
  chartGroup.selectAll(".bar")
    .data(state)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => barWidth)
    .attr("height", d => chartHeight - yScale(d.count))
    .attr("x", (d, i) => i * (barWidth + barSpacing))
    .attr("y", d => yScale(d.count))
    .style("fill", "#69b3a2")
    .style("opacity", 0.5)
    .on("mouseover", d => {
      // toolTip.transition()
      //   .duration(200)
      //   .style("opacity" , .9);
      toolTip.html("Number of Missing Persons: " + d.count)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");

    })
    .on("mouseout", d => {
      toolTip.transition()
        .duration(500)
        // .style("opacity", 0);
    
      });



}).catch(function(error) {
  console.log(error);
});




