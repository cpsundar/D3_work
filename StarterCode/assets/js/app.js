// Step 1: Set up our chart
//= ================================
var svgWidth = 500;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.csv("assets/data/data.csv", function(error, usData) {   
    console.log(usData);

  // Cast the poverty value to a number for each piece of usData
  usData.forEach(function(d) {
    d.poverty = +d.poverty;
  });

    // Cast the poverty value to a number for each piece of usData
    usData.forEach(function(d) {
      d.healthcare = +d.healthcare;
    });
  

    var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(usData, d => d.poverty)])
    .range([0, width])
    console.log(d3.max(usData, d => d.poverty))

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(usData, d => d.healthcare)])
    .range([height, 0]);
    //.range([ 0, height]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xLinearScale).ticks(25);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(25);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    //.attr("transform", `translate(0, ${width})`)
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);






    chartGroup.selectAll("circle")
    .data(usData)
    .enter()
    .append('circle')    
    //.attr("cx", d => d.poverty)
    //.attr("cy", d => d.healthcare)
    .attr("cx", function(d){
      console.log(`state:${ d.abbr} -- poverty ${d.poverty} --  healthcare ${d.healthcare}`)
      return xLinearScale(d.poverty) ;
    })
    .attr("cy", function(d){
      return yLinearScale(d.healthcare);
    })    
    //console.log(`state:${d => d.abbr} -- poverty ${d => d.poverty} --  healthcare ${d => d.healthcare}`)    
    .attr("r",  8)
     //.attr("stroke", "black")
    // .attr("stroke-width", "5")
     .attr("fill", "skyblue")
     //.attr("opacity", ".5")

     //for text
    chartGroup.selectAll("text")
    .data(usData)
    .enter()
    .append("text")    
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare)+4)
    // .attr("fill", "red")
    .attr("fill", "white")
    .attr("font-family","sans-serif")
    .attr("font-size", "8px")
    .attr("text-anchor", "middle")
    
    //.attr("text-anchor", "start")
    .text(d => d.abbr)
    // console.log(` key - ${i} --- data : ${d}`)


    
  });

  