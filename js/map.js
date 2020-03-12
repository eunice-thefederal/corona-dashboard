function drawWorldMap(selector){

    var width = 350, height = 250, scale = 55, center = [10, 45];

    var source = "https://unpkg.com/visionscarto-world-atlas@0.0.4/world/50m.json";



    var svg = d3.select(selector)
    .append("svg")
    .attr("class", "worldmap")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMin")

    var tool_tip = d3.tip()
        .attr("class", "d3-tipforline")
        .offset([-8, 0])
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

                // console.log("d.id", d.countryId);

                var fd = _.filter(stateCentroid, function(obj){
                    return obj.id === d.countryId;
                })

                // console.log("fd", fd[0]['center']);
                if(fd[0] !== undefined){                
                    return fd[0]['center'][0]
                }
            })
            .attr("cy", function(d){

                // console.log("d.id", d.countryId);

                var fd = _.filter(stateCentroid, function(obj){
                    return obj.id === d.countryId;
                })

                // console.log("fd", fd[0]['center']);
                if(fd[0] !== undefined){                
                    return fd[0]['center'][1]
                }
            })
            .attr("r", 1.5)
            .on('mouseover', tool_tip.show)
            .on('mouseout', tool_tip.hide)   
            .on("click", function(d,i){
                console.log(d);

                d3.select("#countryname").text(d.Country)
                d3.select("#countrytotalcases").text(d["Total Cases"])
                d3.select("#countrynewcases").text(d["New Cases"])
                d3.select("#countrytotaldeaths").text(d["Total Deaths"])
                d3.select("#countrynewdeaths").text(d["New Deaths"])
                d3.select("#countrytotalRecovered").text(d["Total Recovered"])
                d3.select("#countrySerious").text(d["Serious"])
                
            })

            
          
          
        

    });
}