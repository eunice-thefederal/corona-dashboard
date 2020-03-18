function createDropDowns(selector, dropdowndata, valuelabel, contentlabel, type){
    // console.log("dropdowndata", dropdowndata);

    var select = d3.select(selector)
    select.html(null);
      var options = select.selectAll('option')
            .data(dropdowndata).enter()
            .append('option')
            .attr("value", function (d) { 
                return d[valuelabel]; 
            })
            .each(function(d) {
                var header = d3.select(this);
                d3.keys(d).forEach(function(key) {
                    if(d[contentlabel]=="China"){
                        
                        header.attr("selected", 'selected');
                    }else if(d[contentlabel]=="Maharashtra"){
                        header.attr("selected", 'selected');
                    }
                });
            })
            .each(function(d) {
            var header = d3.select(this);
                d3.keys(d).forEach(function(key) {
                    if(d["Country"]=="China")
                        header.attr("selected", 'selected');
                });
            })
            .each(function(d) {
            var header = d3.select(this);
                d3.keys(d).forEach(function(key) {
                    if(d["Country"]=="China")
                        header.attr("selected", 'selected');
                });
            })
            .text(function (d) { 
                return d[contentlabel]; 
            });  

        // document.querySelector(selector).selectedIndex = "24";
    
        if(selector == ".dropdown") {
		$('.dropdown').mobileSelect({				
				onClose: function(){
					showCountryData();
				}
			});
    }
    if(selector == ".dropdownstate") {
		$('.dropdownstate').mobileSelect({	
				onClose: function(){
					showStateData();
				}
			});
    }	
   
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
    var selectedValue = $('.dropdown option:selected').attr("data-id");

    
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

function showStateData(){
    var selectedValue = $('.dropdownstate option:selected').attr("data-id");
    
    var fdContent = _.filter(indiaData, function(d){
        return d["stateId"] === selectedValue;
    });
    
    console.log("selectedValue", fdContent[0]);

    if(fdContent[0] !== undefined){
        // return colorScale(fd[0]["totalIndianCases"]);
        d3.select("#statename").text(fdContent[0].StateName)
        animatedFormatData(fdContent[0]["totalIndianCases"],"#stateConfIndians")
        animatedFormatData(fdContent[0]["totalForeignCases"],"#stateConfForeigners")
        animatedFormatData(fdContent[0]["Cured"],"#stateCured")
        animatedFormatData(fdContent[0]["Death"],"#stateDead")
    }

}


