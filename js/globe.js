const START = '#380000', STOP = '#ff0000', NONE = '#131313';
let max = data.max;
let countries = data.countries;
let reports = {};
let countryColors = {};
let myearth;
let overlays = {}
let myoverlay; 

var colorScale = d3.scaleThreshold()
    .domain([1, 6, 11, 26, 101, 1001, 10000, 50000, 100000])
    .range(d3.schemeReds[6]);
// var colorScale = d3.scaleThreshold()
//     .domain([1, 6, 11, 26, 101, 1001])
//     .range(d3.schemeReds[6]);

const lerpHex = (a,b,amount)=>{
    let ah = +a.replace('#', '0x')
    , ar = ah >> 16
    , ag = (ah >> 8) & 0xff
    , ab = ah & 0xff
    , bh = +b.replace('#', '0x')
    , br = bh >> 16
    , bg = (bh >> 8) & 0xff
    , bb = bh & 0xff
    , rr = ar + amount * (br - ar)
    , rg = ag + amount * (bg - ag)
    , rb = ab + amount * (bb - ab);
    return ('#' + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1))
}

for (let iso in countries){
    reports[iso] = countries[iso].cases ;
}

let makeOverlay = (countrydata) => {
    return `
        <img src="${countrydata.flag}">
        <div class="title">
            <span><em>${countrydata.name}</em><span><br/>
            <span class="tiny">Total cases: ${countrydata.cases} </span>
        </div>
    `
}

for (let iso in countries){
    // console.log(countries[iso]);
    
    overlays[iso] = {
        location: { lat: countries[iso].lat, lng: countries[iso].lng },
        content : makeOverlay(countries[iso])
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
    

    function createGlobe(){

        // reports[max] = 0;
        // const maxReports = Math.max(...Object.values(reports));
        // reports[max] = maxReports + maxReports / 2;
        

        let color, mapColors = '';
        for (let iso in reports) {
            // console.log("color", reports[iso]);
            // console.log("color", colorScale(reports[iso]));
            
            color = colorScale(reports[iso]);
            // color = lerpHex(START, STOP, reports[iso] / reports[max]);
            // let changed = countries[iso].deltaCases > 0 || countries[iso].deltaDeaths > 0;
            // countryColors[iso] = color;
            mapColors += `#${iso} {
                fill: ${color};
            } \ `
        }


        document.addEventListener( "DOMContentLoaded", function() {

        /* setup earth */

            $('#total-count').text('/' + data.worldwide.reports.toLocaleString());

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
                quality: 4,
                zoom: 1,
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

     
