function drawBarchart(selector){

    var width = 600, height = 350;

    var reversedData = dailyDeathData.reverse()
    

    var svg = d3.select(selector)
        .append("svg")
        .attr("class", "barchart")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")

    var tool_tip = d3.tip()
        .attr("class", "d3-tipforline")
        .offset([-12, 0])
        .html(function(d) { 
            // return d["Daily Deaths"];
            var html = "<p>"+d.Date +"</p> "
            html += "<p>Daily Deaths: <span>"+ d["Daily Deaths"] +"</span></p> "
            return html; 
         });
    
    svg.call(tool_tip);


    var x = d3.scaleBand()
        .range([0, width - 100])
        .padding(0.4)
        .domain(reversedData.map(function(d) { return d.Date; }));
    
    var y = d3.scaleLinear()
        .range([height-80, 0])
        .domain([0, d3.max(reversedData, function(d) { 
            // console.log(d["Daily Deaths"]);
            return parseInt(d["Daily Deaths"]);
         })]);

    var g = svg.append("g")
        .attr("transform", "translate(" + 70 + "," + 25 + ")");


    g.append("g")
        .attr("transform", "translate(0," + (height - 80) + ")")
        .attr("class", "bottomaxis")
        .call(d3.axisBottom(x).ticks(10))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", -9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "end");
        

    g.append("g")
        .attr("class", "leftaxis")
        .call(d3.axisLeft(y).tickFormat(function(d){
            return d;
        }).ticks(10))
        .append("text")
        .attr("class", "yaxiscaption")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("fill", "black")
        .text("Number of Deaths");


    g.selectAll(".bar")
        .data(reversedData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("fill", "#3498db")
        .attr("x", function(d) { return x(d.Date); })
        .attr("y", function(d) {
            // console.log(d["Daily Deaths"], typeof(d["Daily Deaths"]));
            
             return y(parseInt(d["Daily Deaths"])); })
        .attr("width", x.bandwidth())
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide)   
        .transition()
        .ease(d3.easeLinear)
        .duration(200)
        .delay(function (d, i) {
            return i * 50;
        })
        .attr("height", function(d) { return (height - 80) - y(parseInt(d["Daily Deaths"])); });

    g.selectAll(".barvalues")
        .data(reversedData)
        .enter().append("text")
        .text(function(d){
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