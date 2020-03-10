function drawWorldMap(selector){

    var width = 350, height = 250, scale = 55, center = [10, 45];

    var source = "https://unpkg.com/visionscarto-world-atlas@0.0.4/world/50m.json";

    var svg = d3.select(selector)
    .append("svg")
    .attr("class", "worldmap")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMin")
    
    var g = svg.append("g")
    
    var projection = d3.geoMercator()
    .scale(scale)
    .center(center)
    .translate([width / 2, height / 2])

    var geoPath = d3.geoPath()
        .projection(projection)

    d3.json(source, function(error, mapboundary){

        var countrywise = topojson.feature(mapboundary, mapboundary.objects.countries).features;

        // var countryCentroid = centroids(countrywise);

        // console.log(countryCentroid);

        g.selectAll(".country")
            .data(countrywise).enter().append("path")
                .attr("d", geoPath)
                .attr("class", "country")
                .attr('fill', "#dcdcdc")
            .append("title")
                .text(function(d,i){

                    var fd = _.filter(testData, function(obj){
                        return obj.countryId === parseInt(d.id);
                    })
                    console.log(fd[0]);

                    if(fd[0] !== undefined){
                        return d.id + " " + fd[0]["Country"];
                    }else{
                        return d.id;
                    }
                    
                })
        
        svg.call(d3.zoom()
            .extent([[0, 0], [width, height]])
            .scaleExtent([1, 8])
            .on("zoom", function(){
                g.attr("transform", d3.event.transform);
            }));

        g.selectAll(".country-center")
            .data(countrywise).enter().append("circle")
            .attr("class", "country-center")
            .attr("cx", function(d){
                return projection(d3.geoCentroid(d))[0] 
            })
            .attr("cy", function(d){
                return projection(d3.geoCentroid(d))[1] 
            })
            .attr("r", 1)
          
        

    });
}