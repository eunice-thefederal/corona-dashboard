


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
        .html(function(d) { 

            var html = "<p>"+d.Country +"</p> "
            html += "<p>Total Cases: <span>"+ d["Total Cases"] +"</span></p> "
            return html; 
        });
    svg.call(tool_tip);
    var tooltip = d3.select(selector).append("div").attr("class","maptooltip")
    var g = svg.append("g")
    var projection = d3.geoMercator()
    .scale(scale)
    .center(center)
    .translate([width / 2, height / 2])

    let zoom = d3.zoom().on("zoom", zoomed);

    var zoomControls = d3.select(selector)
        .append("div")
        .attr("class", "zoomControls")
    
    zoomControls.append("button")
        .attr("id", "zoom_in")
        .html('+')
    
    zoomControls.append("button")
        .attr("id", "zoom_out")
        .html('&#8722;')

    d3.select("#zoom_in").on("click", function() {
        zoom.scaleBy(svg.transition().duration(750), 1.2);
    });

    d3.select("#zoom_out").on("click", function() {
        zoom.scaleBy(svg.transition().duration(750), 0.8);
    });
    
    function zoomed() {
        g.attr("transform", d3.event.transform);
    }

    var geoPath = d3.geoPath()
        .projection(projection)
        function centroids(boundarydata){
            return boundarydata.map(function (d){
                return {
                    center: projection(d3.geoCentroid(d)),
                    id: parseInt(d.id)
                }
            });
        }

       
        

        
    d3.json(source, function(error, mapboundary){
        var countrywise = topojson.feature(mapboundary, mapboundary.objects.countries).features;
        var stateCentroid = centroids(countrywise);
        g.selectAll(".country")
            .data(countrywise).enter().append("path")
                .attr("d", geoPath)
                .attr("class", "country")
                .attr('fill', "#dcdcdc")

        svg.call(d3.zoom()
            .extent([[0, 0], [width, height]])
            .scaleExtent([1, 8])
            .on("zoom", zoomed));

        g.selectAll(".country-center")
            .data(filterData).enter().append("circle")
            .attr("class", "country-center")
            .attr("cx", function(d){
                var fd = _.filter(stateCentroid, function(obj){
                    return obj.id === parseInt(d.countryId);
                })
                if(fd[0] !== undefined){                
                    return fd[0]['center'][0]
                }
            })
            .attr("cy", function(d){
                var fd = _.filter(stateCentroid, function(obj){
                    return obj.id === parseInt(d.countryId);
                })
                if(fd[0] !== undefined){                
                    return fd[0]['center'][1]
                }
            })
            .attr("r", 1.5)
            .on('mouseover', tool_tip.show)
            .on('mouseout', tool_tip.hide)   
            .on("click", function(d,i){
                if(d.countryId !== "70"){
                    d3.select("#countryname").text(d.Country)

                }else{
                    d3.select("#countryname").text(d.Country)
                        .style("font-size", "46px")
                        .style("line-height", "55px")
                }
                animator2("Total Cases","countrytotalcases");
                animator2("New Cases","countrynewcases");
                animator2("Total Deaths","countrytotaldeaths");
                animator2("New Deaths","countrynewdeaths");
                animator2("Total Recovered","countrytotalRecovered");       
                animator2("Serious","countrySerious");
                function animator2(fieldName,fieldId) {
                    if(d[fieldName] !== "NULL"){
                        var countrySerious = d3.select("#"+fieldId).text(0)
                        countrySerious.transition()
                            .tween("text", function() {
                                
                                var selection = d3.select(this);    // selection of node being transitioned
                                var start = d3.select(this).text(); // start value prior to transition
                                var end = parseInt(d[fieldName]);                     // specified end value
                                var interpolator = d3.interpolateNumber(start,end); // d3 interpolator
            
                                return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
                                
                            })
                            .duration(1000)
                            .on("end", function() {
                                d3.select("#"+fieldId).text(numberWithCommas(d3.select("#"+fieldId).text()));
                            });
                    }else{
                        d3.select("#"+fieldId).text("-")
                    }
                }
            })
    });
}
