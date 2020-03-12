function drawBarchart(selector){

    console.log("dailyDeathData", dailyDeathData);
    
    

    var width = 600, height = 350;

    var svg = d3.select(selector)
        .append("svg")
        .attr("class", "barchart")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")

    var tool_tip = d3.tip()
        .attr("class", "d3-tipforline")
        .offset([-8, 0])
        .html(function(d) { return d["Daily Deaths"]; });
    
    svg.call(tool_tip);


    var x = d3.scaleBand()
        .range([0, width - 100])
        .padding(0.4)
        .domain(dailyDeathData.map(function(d) { return d.Date; }));
    
    var y = d3.scaleLinear()
        .range([height-80, 0])
        .domain([0, d3.max(dailyDeathData, function(d) { return d["Daily Deaths"]; })]);

    var g = svg.append("g")
        .attr("transform", "translate(" + 70 + "," + 25 + ")");


    g.append("g")
        .attr("transform", "translate(0," + (height - 80) + ")")
        .attr("class", "bottomaxis")
        .call(d3.axisBottom(x).ticks(10))
        .selectAll("text")
        .attr("y", 5)
        .attr("x", -9)
        .attr("dy", ".35em")
        .attr("font-size", "9")
        .attr("transform", "rotate(-65)")
        .style("text-anchor", "end");
        

    g.append("g")
        .call(d3.axisLeft(y).tickFormat(function(d){
            return d;
        }).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("dx", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text("Number of Deaths");


    g.selectAll(".bar")
        .data(dailyDeathData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("fill", "#E20613")
        .attr("x", function(d) { return x(d.Date); })
        .attr("y", function(d) { return y(d["Daily Deaths"]); })
        .attr("width", x.bandwidth())
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide)   
        .transition()
        .ease(d3.easeLinear)
        .duration(200)
        .delay(function (d, i) {
            return i * 50;
        })
        .attr("height", function(d) { return (height - 80) - y(d["Daily Deaths"]); });

    g.selectAll(".barvalues")
        .data(dailyDeathData)
        .enter().append("text")
        .text(function(d){
            console.log("bartext", d['Daily Deaths']);
            return d['Daily Deaths']
        })
        .attr("x", function(d) { return x(d.Date); })
        .attr("y", function(d) { return y(d["Daily Deaths"]+5); })
        .attr("font-size", 9)
        .attr("text-anchor", "middle")
        .attr("class", function(d,i){
            return "barvalues td"+i
        })
        .style("display", "none")


        

}