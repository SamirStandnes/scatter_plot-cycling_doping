var url =
"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

fetch(url).
then(function (response) {return response.json();}).
then(function (myJson) {
  var dataset = myJson.map(function (e) {return (
      Object.assign({}, e, {
        Time: new Date(
        0,
        0,
        0,
        0,
        e.Time.split(":")[0],
        e.Time.split(":")[1],
        0),

        Dope: e.Doping === "" ? false : true }));});




  console.log(dataset);

  var h = 600;
  var w = 900;
  var padding = 70;
  var color1 = "#2081f9";
  var color2 = "#f99820";

  var svg = d3.
  select("body").
  append("svg").
  attr("width", w).
  attr("height", h);

  var xScale = d3.
  scaleTime().
  domain([d3.min(dataset, function (d) {return d.Year;}) - 1, d3.max(dataset, function (d) {return d.Year;})]).
  range([padding, w - padding]);

  var yScale = d3.
  scaleTime().
  domain([d3.min(dataset, function (d) {return d.Time;}), d3.max(dataset, function (d) {return d.Time;})]).
  range([h - padding, padding]);

  var tooltip = d3.
  select("body").
  append("div").
  attr("id", "tooltip").
  style("position", "absolute").
  style("z-index", 1).
  style("opacity", 0).
  text("a simple tooltip");

  svg.
  selectAll("circle").
  data(dataset).
  enter().
  append("circle").
  attr("class", "dot").
  attr("cx", function (d, i) {return xScale(d.Year);}).
  attr("cy", function (d, i) {return yScale(d.Time);}).
  attr("data-xvalue", function (d, i) {return d.Year;}).
  attr("data-yvalue", function (d, i) {return d.Time;}).
  attr("r", 6).
  style("fill", function (d) {return d.Dope ? color1 : color2;}).
  on("mouseover", function (d, i) {
    tooltip.attr("data-year", d.Year);
    tooltip.style("opacity", 0.9);
    tooltip.style("left", xScale(d.Year) + 550 + "px");
    tooltip.style("top", yScale(d.Time) + 15 + "px");
    tooltip.html(
    d.Name +
    " - " +
    d.Nationality +
    "<br>" +
    d.Year +
    "," +
    " Time: " +
    d.Time.getMinutes() +
    ":" +
    d.Time.getSeconds() +
    "<br> Place: " +
    d.Place +
    "<br>" + d.Doping);

  }).
  on("mouseout", function () {
    tooltip.style("opacity", 0);
  });

  svg.
  append("text").
  attr("id", "title").
  text("Doping in Professional Bicycle Racing").
  attr("y", padding - padding * (7 / 12)).
  attr("x", w / 2).
  attr("text-anchor", "middle");

  svg.
  append("text").
  attr("id", "mini-title").
  text("35 Fastest times up Alpe d'Huez ").
  attr("y", padding - padding * (2.5 / 12)).
  attr("x", w / 2).
  attr("text-anchor", "middle");

  var legend = d3.
  select("svg").
  append("g").
  attr("id", "legend").
  selectAll("g").
  data(d3.map(dataset, function (d) {return d.Dope;}).values()).
  enter().
  append("g").
  attr("transform", function (d, i) {
    return "translate(" + w * (7 / 10) + "," + h * (5 / 10) + ")";
  }); // fix this

  legend.
  append("rect").
  attr("width", 10).
  attr("height", 10).
  style("fill", function (d) {return d.Dope ? color1 : color2;}).
  attr("transform", function (d, i) {
    return "translate(0," + i * 20 + ")";
  });

  legend.
  append("text").
  attr("x", 24).
  attr("y", 9).
  text(function (d) {return d.Dope ? "Doping allegations" : " No doping allegations";}).
  attr("transform", function (d, i) {
    return "translate(0," + i * 20 + ")";
  });

  var xAxis = d3.axisBottom(xScale).tickFormat(d3.format(""));

  var yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

  svg.
  append("g").
  attr("transform", "translate(" + padding + " ,0)").
  attr("id", "y-axis").
  call(yAxis);

  svg.
  append("g").
  attr("transform", "translate(0," + (h - padding) + ")").
  attr("id", "x-axis").
  call(xAxis);
});


/*
        document.getElementById("submit").onclick = function() {
          dataset.forEach(e => console.log(e));
          //Scale(parseFloat(e.Time.replace(/:/g, "."))), xScale(e.Year))
        };
    
        //const doping = (arg) => (arg? "No doping allegations" : "Doping allegations");
    */


//.filter(e => e.Year === 1994 || e.Year === 1995);