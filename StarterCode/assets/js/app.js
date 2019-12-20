// @TODO: YOUR CODE HERE!

// The code for the chart is wrapped inside a function
// that automatically resizes the chart
/*
function makeResponsive() {

  // if the SVG area isn't empty when the browser loads, remove it
  // and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }
*/
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 100,
  left: 100
};

var width = svgWidth - chartMargin.left - chartMargin.right;
var height = svgHeight - chartMargin.top - chartMargin.bottom;

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;//chartWidth = 900
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;//chartHeight = 600

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  
// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from data.csv
d3.csv("/assets/data/data.csv").then(function(acs_Data) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    acs_Data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });
    console.log(acs_Data);
    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([6, d3.max(acs_Data, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(acs_Data, d => d.healthcare)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);
    
    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(acs_Data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    var textGroup = chartGroup.selectAll()
    .data(acs_Data)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare) + 5)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "15px")
    .attr("fill", "white")
    .text(d => d.abbr);

  // Append axes titles
    chartGroup.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .attr("x", width/2)
    .attr("y", height + 40)
    .text("% in Poverty");

    chartGroup.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .attr("x", -250)
    .attr("y", -50)
    //.attr("y", height)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Health Care (%)");

  

  // Step 1: Append a div to the body to create tooltips, assign it a class
  // =======================================================
  var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");

  // Step 2: Add an onmouseover event to display a tooltip
  // ========================================================
  circlesGroup.on("mouseover", function(d, i) {
    toolTip.style("display", "block");
    toolTip.html(`% in Poverty: <strong>${d.poverty[i]}</strong>`)
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
  })
    // Step 3: Add an onmouseout event to make the tooltip invisible
    .on("mouseout", function() {
      toolTip.style("display", "none");
    });
  });
  
/*    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}<br>Poverty: ${d.poverty}<br>Health Care: ${d.healthcare}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Health Care(%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("% in Poverty");

  }).catch(function(error) {
    console.log(error);
  })
}
*/
