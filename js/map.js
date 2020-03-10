function drawWorldMap(selector){
    var width = 350, height = 250, scale = 55, center = [10, 45];

    var source = "https://unpkg.com/visionscarto-world-atlas@0.0.4/world/50m.json";

    var svg = d3.select(selector)
    .append("svg")
    .attr("class", "worldmap")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMin")
    .append("g")

    // var projection = d3.geoMercator()
    // .scale(scale)
    // .center(center)
    // .translate([width / 2, height / 2])
    
    var projection = d3.geoMercator()
    .scale(scale)
    .center(center)
    .translate([width / 2, height / 2])

    var geoPath = d3.geoPath()
        .projection(projection)

    d3.json(source, function(error, mapboundary){

        var countrywise = topojson.feature(mapboundary, mapboundary.objects.countries).features;

        // console.log(countrywise);

        svg.selectAll(".constituency")
            .data(countrywise).enter().append("path")
            .attr("d", geoPath)
            .attr("class", "country")
            .attr('fill', "green")
            .attr('stroke-opacity', "1")

        

    });
}