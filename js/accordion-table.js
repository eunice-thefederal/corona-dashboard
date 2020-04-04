function drawAccTable(data, selector){

  var stateKey = "state", districtKey = "districtData";
   
    var labels = ["district", "confirmed", "active", "recovered", "deceased"];
    var sublabels = ["district", "confirmed"];
    // var labels = d3.keys(data[0][districtKey][0]); 

    // console.log("table", data);
    // console.log("labels", labels);

    var table = d3.select(selector).append('table')
    var thead = table.append('thead')
    var	tbody = table.append('tbody')

    // // // append the header row
		thead.append('tr')
        .selectAll('th')
        .data(labels).enter()
        .append('th')
          .text(function (column) { return column; });

    
    data.forEach(function(obj){
      // console.log("loop", obj);

      var stateLevelData = []

      var stateData = obj[stateKey]
      var districtData = obj[districtKey]

      var sum = d3.sum(districtData, function(d) {
        return d.confirmed;
      })

      stateLevelData.push({
        "district": stateData,
        "confirmed": sum
      });

      


      

      console.log("stateData", stateData);
      console.log("districtData", districtData);
      console.log(stateData,":" ,sum);
      
      var rowsState = tbody.append('tr')
        .attr("class", "stateRow")
        .append('td')
        .attr("colspan", "5")
        .text(stateData)

      var rows = tbody.selectAll('districtRow')
        .data(districtData)
        .enter()
        .append('tr')
        .attr("class", "districtRow");

      // create a cell in each row for each column
      var cells = rows.selectAll('td')
        .data(function (row) {
          return labels.map(function (column) {
            // console.log("column", column);
            // console.log("row", row);
            
            return {column: column, value: row[column]};
          });
        })
        .enter()
        .append('td')
          .text(function (d) { return d.value; });


      
    })

    //   // create a row for each object in the data
      // var rows = tbody.selectAll('tr')
      //   .data(data)
      //   .enter()
      //   .append('tr');

      // create a cell in each row for each column
      // var cells = rows.selectAll('td')
      //   .data(function (row) {
      //     return labels.map(function (column) {
      //       console.log("column", column);
      //       console.log("row", row);
            
      //       return {column: column, value: row[column]};
      //     });
      //   })
      //   .enter()
      //   .append('td')
      //     .text(function (d) { return d.value; });

    return table;

    
    
    
}

$(document).ready(function(){

  $(".districtRow").hide();

  $('.stateRow').click(function(){
            $(this).nextUntil('tr.stateRow').slideToggle(200);
            this.classList.toggle("active");
        })

});