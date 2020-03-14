function createDropDowns(selector, dropdowndata){
    // console.log("dropdowndata", dropdowndata);

    var select = d3.select(selector)
    select.html(null);
      var options = select.selectAll('option')
            .data(dropdowndata).enter()
            .append('option')
            .attr("value", function (d) { 
                return d["countryId"]; 
            })
            .text(function (d) { 
                return d["Country"]; 
            });   
    
}


function animatedFormatData(inputdata,selector) {
    // var datapoint = parseInt(inputdata)
    // console.log(selector, typeof(datapoint));
    // console.log(selector, datapoint);
    

    if(inputdata !== "NULL"){
        var countrySerious = d3.select(selector).text(0)
        countrySerious.transition()
            .tween("text", function() {
                
                var selection = d3.select(this);    // selection of node being transitioned
                var start = d3.select(this).text(); // start value prior to transition
                var end = parseInt(inputdata);                     // specified end value
                var interpolator = d3.interpolateNumber(start,end); // d3 interpolator

                return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
                
            })
            .duration(1000)
            .on("end", function() {
                d3.select(selector).text(numberWithCommas(d3.select(selector).text()));
            });
    }else{
        d3.select(selector).text("-")
    }
}


function showCountryData(){
    var selectedValue = document.querySelector(".dropdown").value;

    
    var fdContent = _.filter(filterData, function(d){
        return d.countryId === selectedValue;
    });
    
    console.log("selectedValue", fdContent[0]["New Cases"]);
    console.log("selectedValue", typeof(fdContent[0]["New Cases"]));

    if(fdContent[0]["countryId"] !== "70"){
        d3.select("#countryname").text(fdContent[0]["Country"])

    }else{
        d3.select("#countryname").text(fdContent[0]["Country"])
            .style("font-size", "46px")
            .style("line-height", "55px")
    }

    animatedFormatData(fdContent[0]["Total Cases"],"#countrytotalcases") ;
    animatedFormatData(fdContent[0]["New Cases"],"#countrynewcases");
    
    animatedFormatData(fdContent[0]["Total Deaths"],"#countrytotaldeaths");
    animatedFormatData(fdContent[0]["New Deaths"],"#countrynewdeaths");
    animatedFormatData(fdContent[0]["Total Recovered"],"#countrytotalRecovered");
    animatedFormatData(fdContent[0]["Serious"],"#countrySerious");

}