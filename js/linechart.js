function drawLinechart(selector){

    console.log("dailyTotalDeathData", dailyTotalDeathData);

    var reversedData = dailyTotalDeathData.reverse()

    var width = 600, height = 350;

    var svg = d3.select(selector)
        .append("svg")
        .attr("class", "barchart")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")


    var x = d3.scaleBand()
        .range([0, width - 100])
        .padding(0.4)
        .domain(reversedData.map(function(d) { return d.Date; }));
    
    var y = d3.scaleLinear()
        .range([height-80, 0])
        .domain([0, d3.max(reversedData, function(d) { return d["Total Deaths"]; })]);

    var g = svg.append("g")
        .attr("transform", "translate(" + 70 + "," + 25 + ")");

        var line = d3.line()
            .x(function(d) { return x(d.Date)})
            .y(function(d) { return y( d["Total Deaths"])})
            .curve(d3.curveMonotoneX)


    g.append("g")
        .attr("transform", "translate(0," + (height - 80) + ")")
        .attr("class", "bottomaxis")
        .call(d3.axisBottom(x).ticks(10))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("font-size", "9")
        .attr("transform", "rotate(65)")
        .style("text-anchor", "start");
        

    g.append("g")
        .call(d3.axisLeft(y).tickFormat(function(d){
            return d;
        }).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("fill", "black")
        .text("Number of Deaths");

    g.append("path")
        .datum(reversedData)
        .attr("fill", "none")
        .attr("stroke", "#E20613")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    g.selectAll(".dot")
        .data(reversedData)
      .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) { return x(d.Date) })
        .attr("cy", function(d) { return y( d["Total Deaths"]) })
        .attr("fill", "brown")
        .attr("r", 2);



        

}