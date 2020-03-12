function drawWorldMap(selector){

    var width = 350, height = 250, scale = 55, center = [10, 45];

    var source = "https://unpkg.com/visionscarto-world-atlas@0.0.4/world/50m.json";


    var svg = d3.select(selector)
    .append("svg")
    .attr("class", "world map")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMin")

    var tool_tip = d3.tip()
        .attr("class", "d3-tipforline")
        .offset([-15, 0])
        .html(function(d) { return d.Country +":"+ d["Total Cases"]; });
    
    svg.call(tool_tip);

    var tooltip = d3.select(selector).append("div").attr("class","maptooltip")
    
    var g = svg.append("g")
    
    var projection = d3.geoMercator()
    .scale(scale)
    .center(center)
    .translate([width / 2, height / 2])

    var geoPath = d3.geoPath()
        .projection(projection)


        function centroids(boundarydata){
            return boundarydata.map(function (d){

                // return d
                return {
                    center: projection(d3.geoCentroid(d)),
                    id: parseInt(d.id)
                }
            });
        }

    d3.json(source, function(error, mapboundary){

        var countrywise = topojson.feature(mapboundary, mapboundary.objects.countries).features;



        var stateCentroid = centroids(countrywise);

        console.log("stateCentroid", stateCentroid);

        
        


        g.selectAll(".country")
            .data(countrywise).enter().append("path")
                .attr("d", geoPath)
                .attr("class", "country")
                .attr('fill', "#dcdcdc")
                // .on('mouseover', tool_tip.show)
                // .on('mouseout', tool_tip.hide) 

        
        svg.call(d3.zoom()
            .extent([[0, 0], [width, height]])
            .scaleExtent([1, 8])
            .on("zoom", function(){
                g.attr("transform", d3.event.transform);
            }));


        g.selectAll(".country-center")
            .data(filterData).enter().append("circle")
            .attr("class", "country-center")
            .attr("cx", function(d){

                // console.log("d.id", d);

                var fd = _.filter(stateCentroid, function(obj){
                    return obj.id === parseInt(d.countryId);
                })

                // console.log("fd", fd[0]['center']);
                if(fd[0] !== undefined){                
                    return fd[0]['center'][0]
                }
            })
            .attr("cy", function(d){

                // console.log("d.id", d.countryId);

                var fd = _.filter(stateCentroid, function(obj){
                    return obj.id === parseInt(d.countryId);
                })

                // console.log("fd", fd[0]['center']);
                if(fd[0] !== undefined){                
                    return fd[0]['center'][1]
                    // console.log(d);
                }
            })
            .attr("r", 1.5)
            .on('mouseover', tool_tip.show)
            .on('mouseout', tool_tip.hide)   
            .on("click", function(d,i){

                console.log(d);
                

                d3.select("#countryname").text(d.Country)
                
                if(d["Total Cases"] !== "NULL" ){

                    var countrytotalcases = d3.select("#countrytotalcases").text(0)
                    countrytotalcases.transition()
                        .tween("text", function() {
                            
                            var selection = d3.select(this);    // selection of node being transitioned
                            var start = d3.select(this).text(); // start value prior to transition
                            var end = parseInt(d["Total Cases"]);                     // specified end value
                            var interpolator = d3.interpolateNumber(start,end); // d3 interpolator

                            return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
                            
                        })
                        .duration(1000);

                }else{
                    d3.select("#countrytotalcases").text("-")
                }
                
                
                if(d["New Cases"] !== "NULL"){

                    var countrynewcases = d3.select("#countrynewcases").text(0)
                    countrynewcases.transition()
                        .tween("text", function() {
                            
                            var selection = d3.select(this);    // selection of node being transitioned
                            var start = d3.select(this).text(); // start value prior to transition
                            var end = parseInt(d["New Cases"]);                     // specified end value
                            var interpolator = d3.interpolateNumber(start,end); // d3 interpolator
        
                            return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
                            
                        })
                        .duration(1000);
                        

                }else{
                    d3.select("#countrynewcases").text("-")
                }
                

                if(d["Total Deaths"] !== "NULL"){
                   var countrytotaldeaths = d3.select("#countrytotaldeaths").text(0)
                   countrytotaldeaths.transition()
                        .tween("text", function() {
                            
                            var selection = d3.select(this);    // selection of node being transitioned
                            var start = d3.select(this).text(); // start value prior to transition
                            var end = parseInt(d["Total Deaths"]);                     // specified end value
                            var interpolator = d3.interpolateNumber(start,end); // d3 interpolator
        
                            return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
                            
                        })
                        .duration(1000);
                }else{
                    d3.select("#countrytotaldeaths").text("-")
                }
                
                if(d["New Deaths"] !== "NULL"){
                    var countrynewdeaths = d3.select("#countrynewdeaths").text(0)
                    countrynewdeaths.transition()
                        .tween("text", function() {
                            
                            var selection = d3.select(this);    // selection of node being transitioned
                            var start = d3.select(this).text(); // start value prior to transition
                            var end = parseInt(d["New Deaths"]);                     // specified end value
                            var interpolator = d3.interpolateNumber(start,end); // d3 interpolator
        
                            return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
                            
                        })
                        .duration(1000);

                }else{
                    d3.select("#countrynewdeaths").text("-")
                }
                
                if(d["Total Recovered"] !== "NULL"){
                    var countrytotalRecovered = d3.select("#countrytotalRecovered").text(0)
                    countrytotalRecovered.transition()
                        .tween("text", function() {
                            
                            var selection = d3.select(this);    // selection of node being transitioned
                            var start = d3.select(this).text(); // start value prior to transition
                            var end = parseInt(d["Total Recovered"]);                     // specified end value
                            var interpolator = d3.interpolateNumber(start,end); // d3 interpolator
        
                            return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
                            
                        })
                        .duration(1000);
                }else{
                    d3.select("#countrytotalRecovered").text("-")
                }
                
                if(d["Serious"] !== "NULL"){
                    var countrySerious = d3.select("#countrySerious").text(0)
                    countrySerious.transition()
                        .tween("text", function() {
                            
                            var selection = d3.select(this);    // selection of node being transitioned
                            var start = d3.select(this).text(); // start value prior to transition
                            var end = parseInt(d["Serious"]);                     // specified end value
                            var interpolator = d3.interpolateNumber(start,end); // d3 interpolator
        
                            return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
                            
                        })
                        .duration(1000);
                }else{
                    d3.select("#countrySerious").text("-")
                }
                
                
                
                
            })

            
          
          
        

    });
}