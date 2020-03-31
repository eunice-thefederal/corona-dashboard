const START = '#380000', STOP = '#ff0000', NONE = '#131313';
// let countries = data.countries;
let reports = {};
let countryColors = {};
let myearth;
let overlays = {}
let overlays2 = {}
let myoverlay; 

let isMobile = !1;
(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) && (isMobile = !0);


var colorScale = d3.scaleThreshold()
    .domain([1, 6, 11, 26, 101, 1001, 10000, 50000, 100000])
    .range(["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"]);
// var colorScale = d3.scaleThreshold()
//     .domain([1, 6, 11, 26, 101, 1001, 10000, 50000, 100000])
//     .range(d3.schemeReds[6]);
// var colorScale = d3.scaleThreshold()
//     .domain([1, 6, 11, 26, 101, 1001])
//     .range(d3.schemeReds[6]);


for (let iso in threeData){
    reports[iso] = threeData[iso].cases ;
}


let makeOverlay = (countrydata) => {
    let noofCases,noofDeath, noofRecovered, noofNCases, noofNDeath, noofNCritical
    if(countrydata.cases !== undefined){
        noofCases = countrydata.cases
    }else{
        noofCases = "-"
    }

    if(countrydata.deaths !== undefined){
        noofDeath = countrydata.deaths
    }else{
        noofDeath = "-"
    }

    if(countrydata.recovered !== undefined){
        noofRecovered = countrydata.recovered
    }else{
        noofRecovered = "-"
    }

    if(countrydata.newcases !== undefined){
        noofNCases = countrydata.newcases
    }else{
        noofNCases = "-"
    }
    
    if(countrydata.newdeaths !== undefined){
        noofNDeath = countrydata.newdeaths
    }else{
        noofNDeath = "-"
    }
    
    if(countrydata.critical !== undefined){
        noofNCritical = countrydata.critical
    }else{
        noofNCritical = "-"
    }

    



    

    
    return `
        <img src="${countrydata.flag}">
        <div class="title">
            <h2><em>${countrydata.name}</em></h2>
            <p class="points">Total Cases <br><span> ${noofCases} </span></p>
        </div>
        <div class="groupData">
            <p class="points">Total Deaths <br><span> ${noofDeath} </span></p>
            <p class="points">Total Recovered <br><span> ${noofRecovered} </span></p>
        </div>
        <div class="groupData">
            <p class="points">New Cases <br><span> ${noofNCases} </span></p>
            <p class="points">New Deaths <br><span> ${noofNDeath} </span></p>
            <p class="points">Serious/critical <br><span> ${noofNCritical} </span></p>
        </div>
    `
}

// console.log(threeData);


// for (let iso in countries){
//     // console.log(countries[iso]);
    
//     overlays[iso] = {
//         location: { lat: countries[iso].lat, lng: countries[iso].lng },
//         content : makeOverlay(countries[iso])
//     };
//     // overlays[iso] = {
//     //     reports: countries[iso].reports, 
//     //     cases: countries[iso].cases, 
//     //     deaths: countries[iso].deaths,
//     //     location: { lat: countries[iso].lat, lng: countries[iso].lng },
//     //     content : makeOverlay(countries[iso])
//     // };
// }
for (let iso in threeData){
    // console.log(countries[iso]);
    
    overlays[iso] = {
        location: { lat: threeData[iso].lat, lng: threeData[iso].lng },
        content : makeOverlay(threeData[iso])
    };
    // overlays[iso] = {
    //     reports: countries[iso].reports, 
    //     cases: countries[iso].cases, 
    //     deaths: countries[iso].deaths,
    //     location: { lat: countries[iso].lat, lng: countries[iso].lng },
    //     content : makeOverlay(countries[iso])
    // };
}

console.log("overlays", overlays)
console.log("overlays2", overlays2)
    

    function createGlobe(){

        // reports[max] = 0;
        // const maxReports = Math.max(...Object.values(reports));
        // reports[max] = maxReports + maxReports / 2;
        

        let color, mapColors = '';
        for (let iso in reports) {
            // console.log("color", reports[iso]);
            // console.log("color", colorScale(reports[iso]));
            
            color = colorScale(reports[iso]);
            // countryColors[iso] = color;
            mapColors += `#${iso} {
                fill: ${color};
            } \ `
        }


        document.addEventListener( "DOMContentLoaded", function() {

        /* setup earth */

            // $('#total-count').text('/' + data.worldwide.reports.toLocaleString());

            myearth = new Earth( "myearth", {
                autoRotate: true,
                // autoRotateDelay: 3000,
                mapHitTest: true,
                mapLandColor: "#FFFFFF",
                mapSeaColor: '#011F67', //#011F67 or 004BE0 or 07FDFE
                mapBorderColor: 'black',
                mapBorderWidth : 0.5,
                mapStyles: mapColors.slice(0, mapColors.length - 3),
                transparent: true,
                lightType: 'sun',
                lightIntensity: 1,
                occlude: true,
                quality: 4,
                zoom: isMobile ? 1.25 : 1.1,
                zoomMax: 2,
                zoomable: !0
                // mapStyles : '#FR, #ES, #DE, #IT, #GB, #BE, #NL, #LU, #DK, #SE, #FI, #IE, #PT, #GR, #EE, #LV, #LT, #PL, #CZ, #AT, #BG, #MT, #SK, #SI, #HR, #HU, #RO, #CY { fill: red; } #GL, #GF { fill: #red; }'
            } );

            myearth.addEventListener('click', event => {
                // console.log(event.id);
//                 if (myoverlay) myoverlay.remove();
                if (myoverlay) {
                    myoverlay.visible = 0; 
                }
                
                if (event.id) {
                    
                    if (event.id in countries) { 


                        console.log(event.id);

                        myoverlay = myearth.addOverlay( overlays[event.id] );
                        // myoverlay = myearth.addOverlay( {
                        //     location: { lat: countries[event.id].lat, lng: countries[event.id].lng },
                        //     content : makeOverlay()
                        // } );
        
                        //Go to Clicked location
                        myearth.goTo({
                            lat: countries[event.id].lat,
                            lng: countries[event.id].lng
                        })

                    }
                }
               
                
            })

            
        
        
        
        } );

    }

     createGlobe();

     
