/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [
    39.981111,
    -75.12588500976562
  ],
  zoom: 11
});


var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var featureGroup=[]

var eachFeatureFunction = function(layer) {
  console.log(layer)
  layer.on('click', function (event) {
    /* =====================
    The following code will run every time a layer on the map is clicked.
    Check out layer.feature to see some useful data about the layer that
    you can use in your application.
    ===================== */
    console.log(layer.feature);
    showResults();
    map.fitBounds(event.target.getBounds())
    console.log(event.target.getBounds())
  });
};


/* =====================
Build pages
===================== */
var data
var markers
var page1 = {
  title: "page1",
  content: "all data, overview and introductions",
  bbox:[[37.82344475985, -75.3742359375], [40.130591021795, -74.88830540625]],
  startYear: 0,
  endYear: 1000000
}

var page2 = {
  title: "page2",
  content: "1960s 1970s",
  bbox:[[38.827522475985, -75.374450959375], [40.13059109801795, -74.888640625]],
  startYear: 1960,
  endYear: 1979
}

var page3 = {
  title: "page3",
  content: "1980s 1990s",
  bbox:[[39.8275075985, -75.37445268359375], [40.1300063801795, -74.88830140625]],
  startYear: 1980,
  endYear: 1999
}

var page4 = {
  title: "page4",
  content: "2000s 2010s",
  bbox:[[38.82752248475985, -75.37445068359375], [40.1305910111795, -74.88834640625]],
  startYear: 2000,
  endYear: 2019
}

var page5 = {
  title: "page5",
  content: "Northeast",
  bbox:[[37.827522454985, -75.37445068359375], [42.1305913801795, -75.88831625]],
  startYear: 0,
  endYear: 1000000
}

var page6 = {
  title: "page6",
  content: "Northwest",
  bbox:[[36.352244075985, -76.37445068359375], [40.130591063801795, -75.8883056640625]],
  startYear: 0,
  endYear: 1000000
}

var page7 = {
  title: "page7",
  content: "Southwest",
  bbox:[[28.82752244475985, -75.644506159375], [40.130591063801795, -75.8883056640625]],
  startYear: 0,
  endYear: 1000000
}


var slides = [
  page1,
  page2,
  page3,
  page4, 
  page5,
  page6,
  page7
]

var currentPage = -1

var nextPage = function(){
  //event handling for proceeding forward in slideshow
  tearDown()
  var nextPage = currentPage +1
  currentPage = nextPage
  buildPage(slides[nextPage])
}

var prevPage = function(){
  //event handling for going backward in slideshow
  tearDown()
  var prevPage = currentPage -1
  currentPage = prevPage
  buildPage(slides[prevPage])
}

var buildPage = function(pageDefinition){
  //build up a "slide" given a page definition

  //var locations = parsedData.rows
  //markers = locations.map(function(location){
  //  return L.geoJson(location.the_geom_geojson,{
  //    style: myStyle
  //  })
  //})

  //markers.forEach(function(marker){marker.addTo(map)})
  tearDown()

  map.fitBounds(pageDefinition.bbox)
  console.log(currentPage)

  var filtered = _.filter(data,function(row){
    return (row.date_ >= pageDefinition.startYear && row.date_ <= pageDefinition.endYear)
  })

  console.log(filtered)
  var pageFeature

  //filter data
  for (var i = 0; i < filtered.length - 1; i++){
    pageFeature = L.geoJson(filtered[i]["the_geom_geojson"], {
      style: myStyle
    }).addTo(map).bindPopup(filtered[i]["artist"]).openPopup()
   }

  //modify text
  $('#title').text(pageDefinition.title)
  $('#content').text(pageDefinition.content)
  
  //modify legend
  leid1 = "#legend1"


  var dele1 = $(leid1).html();
  $(leid1).replaceWith(dele1);


  


  if(currentPage === 0){
    $('#prev').hide()
  }else{
    $('#prev').show()
    $('#prev').prop("disabled", false)
  }

  if(currentPage === slides.length-1){
    $('#next').hide()
  }else{
    $('#next').show()
    $('#next').prop("disabled", false)
  }
}

var tearDown = function(){
  //remove all plotted data in prep for building the page with new filters, etc.
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
});
return map
}




/* =====================
Load data
===================== */

//json
//var dataset = "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20percent_for_art_public"

//geojson
var dataset = "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20,%20ST_AsGeoJSON(the_geom)::json%20AS%20the_geom_geojson%20FROM%20percent_for_art_public"


var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};




/* =====================
Custom style
===================== */

var myStyle = function(feature) {
return {color: "#f7523c", weight: 4, fillOpacity: 0.35 };
};




/* =====================
Execute here:
===================== */
$('#prev').hide()
$(document).ready(function() {
  $.ajax(dataset).done(function(parsedData) {
    //var string = JSON.stringify(response);
    //var parsedData = JSON.parse(response);
    console.log(parsedData.rows[1]);
    for (var i = 0; i < parsedData.rows.length - 1; i++){
    feature = L.geoJson(parsedData.rows[i]["the_geom_geojson"], {
      style: myStyle
    })
    featureGroup.push(feature)
   }
   data = parsedData.rows
   
   featureGroup.forEach(function(polygon){
     polygon.addTo(map)
   })

   console.log(featureGroup)

   //featureGroup.eachLayer(eachFeatureFunction);
   
  });
  $('#next').click(nextPage)
  $('#prev').click(prevPage)
});

