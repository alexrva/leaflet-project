// Define SVG area dimensions
let width = 500;
let height = 400;

// Define the chart's margins as an object
let margins = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40
};

// Bring in toolTip to make it an interactive visual 
let toolTip1 = d3.select("body")
      .append("div")
      .classed("my-tooltip1", true);
      // .style("opacity", 0);

// Define dimensions of the chart area
let chart_width = width - margins.left - margins.right;
let chart_height = height - margins.top - margins.bottom;

// Select body, append SVG area to it, and set the dimensions
let svg1 = d3
  .select("body")
  .append("svg")
  .attr("height", height)
  .attr("width", width);
 

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
let chart_group = svg1.append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`);

// Load data from CSV
d3.csv("../gender_breakdown.csv").then(function(gender) {

  // Print the gender and count of missing persons associated with each 
  //console.log(gender);


  gender.forEach(function(type) {
    type.count = +type.count;
    console.log(type.count)
  });


  // Create axes 

  let x = d3.scaleBand()
    .domain(gender.map(d => d.gender))
    .range([0, width])
    .padding(0.4);

  y = d3.scaleLinear([0, d3.max(gender, row => row.count)], [chart_height, 0]);

 let x_axis = d3.axisBottom(x);
 let y_axis = d3.axisLeft(y).tickValues(y.ticks().concat(y.domain()));

 // Append axes
 chart_group.append("g")
   .attr("transform", `translate(0, ${chart_height})`)
   .call(x_axis);

 chart_group.append("g")
   .call(y_axis);

  let bar_spacing = 5; // desired space between each bar

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  let bar_width = (chart_width - (bar_spacing * (gender.length - 1))) / gender.length;

  svg1.append("text")
    .attr("x", 265 )
    .attr("y",  25)
    .style("text-anchor", "middle")
    .text("Gender Breakdown of Missing Persons");

  // @TODO
  // Create code to build the bar chart using the tvData.
  chart_group.selectAll(".bar")
    .data(gender)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => bar_width)
    .attr("height", d => chart_height - y(d.count))
    .attr("x", (d, i) => i * (bar_width + bar_spacing))
    .attr("y", d => y(d.count))
    .style("fill", "#800000")
    .style("opacity", 1.0)
    .on("mouseover", d => {
      // toolTip.transition()
      //   .duration(200)
      //   .style("opacity" , .9);
      toolTip1.html("Number of Missing Persons: " + d.count)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");

    })
    .on("mouseout", d => {
      toolTip1.transition()
        .duration(500)
        // .style("opacity", 0);
    
      });



}).catch(function(error) {
  console.log(error);
});