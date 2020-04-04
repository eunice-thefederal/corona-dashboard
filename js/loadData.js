var lastupdate, indiaTotal;
var countrywisedata = (function() {
    var countrywisedata = null;
    jQuery.ajax({
        'async': false,
        'global': false,
        'dataType': 'json',
        'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=totalCases',
        'success': function(data) {
            countrywisedata = data["records"];
            lastupdate = data["last_updated"];
              // console.log("JSON RECORDS DATA:"+JSON.stringify(data["records"], null, 4));
            //console.log("DATA:"+data);
        }
    });
    return countrywisedata;
})();
var dailyDeathData = (function() {
    var dailyDeathData = null;
    jQuery.ajax({
        'async': false,
        'global': false,
        'dataType': 'json',
        'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=dailyDeaths',
        'success': function(data) {
            dailyDeathData = data;
            // console.log("JSON RECORDS DAILY DEATH DATA:"+JSON.stringify(data, null, 4));
        }
    });
    return dailyDeathData;
})();
var dailyTotalDeathData = (function() {
    var dailyTotalDeathData = null;
    jQuery.ajax({
        'async': false,
        'global': false,
        'dataType': 'json',
        'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=totalDeaths',
        'success': function(data) {
            dailyTotalDeathData = data;
             //  console.log("JSON RECORDS DATA:"+JSON.stringify(data["records"], null, 4));
            //console.log("DATA:"+data);
        }
    });
    return dailyTotalDeathData;
})();
var globalTotalData = (function() {
    var globalTotalData = null;
    jQuery.ajax({
        'async': false,
        'global': false,
        'dataType': 'json',
        'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=totalCases',
        'success': function(data) {
            globalTotalData = data["totals"];

        }
    });
    return globalTotalData;
})();
var currentData = (function() {
    var currentData = null;
    jQuery.ajax({
        'async': false,
        'global': false,
        'dataType': 'json',
        'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=chinaCases',
        'success': function(data) {
            currentData = data;

        }
    });
    return currentData;
})();
var indiaData = (function() {
    var indiaData = null;
    jQuery.ajax({
        'async': false,
        'global': false,
        'dataType': 'json',
        'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=StateWise',
        'success': function(data) {
            indiaData = data["list"];
            indiaTotal = data["totals"];
            // console.log("data", data["list"]);
            
        }
    });
    return indiaData;
})();

var threeData = (function() {
    var threeData = null;
    jQuery.ajax({
        'async': false,
        'global': false,
        'dataType': 'json',
        'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=worldData',
        'success': function(data) {
            threeData = data["countries"];
            // console.log("data", data["list"]);
            
        }
    });
    return threeData;
})();

var indiaDistrictData = (function() {
    var indiaDistrictData = null;
    jQuery.ajax({
        'async': false,
        'global': false,
        'dataType': 'json',
        'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=distData',
        'success': function(data) {
            indiaDistrictData = data;
            // console.log("data", data["list"]);
            
        }
    });
    return indiaDistrictData;
})();


