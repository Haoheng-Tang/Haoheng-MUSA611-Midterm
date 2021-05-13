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
// var Stamen_TonerLite = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var featureGroup=[]
var artistGroup=[]

var myIcon1 = L.divIcon({className: 'my-div-icon1'});
var myIcon2 = L.divIcon({className: 'my-div-icon2'});
var myIcon3 = L.divIcon({className: 'my-div-icon3'});
var myIcon4 = L.divIcon({className: 'my-div-icon4'});
var myIcon5 = L.divIcon({className: 'my-div-icon5'});
var myIcon6 = L.divIcon({className: 'my-div-icon6'});

var tearDown = function(){
  //remove all plotted data in prep for building the page with new filters, etc.
  featureGroup.map(function(marker){
    map = map.removeLayer(marker)
    featureGroup=[]
    artistGroup=[]
  });
 

}


/* =====================
Build pages
===================== */
var data
var markers
var page1 = {
  title: "Public Art from 1960 to 2020",
  bbox:[[40.06604611654875, -75.21446228027344], [39.91184298474967, -75.05756378173828]],
  startYear: 0,
  endYear: 1000000,
  popup: true,
  entryLengend: [{year: "1960", color: "#f7523c"}, {year: "1970", color: "#5D4253"}, 
  {year: "1980", color: "#E08CB0"}, {year: "1990", color: "#F7DBB3"}, {year: "2000", color: "#CD9457"},
  {year: "2010", color: "#C7D5BD"}]
}

var page2 = {
  title: "Public Art in 1960s & 1970s",
  bbox:[[40.06604611654875, -75.21446228027344], [39.91184298474967, -75.05756378173828]],
  startYear: 1960,
  endYear: 1979,
  popup: true,
  entryLengend: [{year: "1960", color: "#f7523c"}, {year: "1970", color: "#5D4253"}]
}

var page3 = {
  title: "Public Art in 1980s & 1990s",
  bbox:[[40.06604611654875, -75.21446228027344], [39.91184298474967, -75.05756378173828]],
  startYear: 1980,
  endYear: 1999,
  popup: true,
  entryLengend: [{year: "1980", color: "#E08CB0"}, {year: "1990", color: "#F7DBB3"}]
}

var page4 = {
  title: "Public Art in 2000s & 2010s",
  content: "2000s 2010s",
  bbox:[[40.06604611654875, -75.21446228027344], [39.91184298474967, -75.05756378173828]],
  startYear: 2000,
  endYear: 2019,
  popup: true,
  entryLengend: [ {year: "2000", color: "#CD9457"}, {year: "2010", color: "#C7D5BD"}]
}

var page5 = {
  title: "Public Art in the Northeast",
  bbox:[[39.99290359080194, -75.19824987792967], [39.92395554100352, -75.09860452270508]],
  startYear: 0,
  endYear: 1000000,
  popup: false,
  entryLengend: [{year: "1960", color: "#f7523c"}, {year: "1970", color: "#5D4253"}, 
  {year: "1980", color: "#E08CB0"}, {year: "1990", color: "#F7DBB3"}, {year: "2000", color: "#CD9457"},
  {year: "2010", color: "#C7D5BD"}]
}

var page6 = {
  title: "Public Art in the Northwest",
  bbox:[[39.99290359080194, -75.25824987792967], [39.92395554100352, -75.15860452270508]],
  startYear: 0,
  endYear: 1000000,
  popup: false,
  entryLengend: [{year: "1960", color: "#f7523c"}, {year: "1970", color: "#5D4253"}, 
  {year: "1980", color: "#E08CB0"}, {year: "1990", color: "#F7DBB3"}, {year: "2000", color: "#CD9457"},
  {year: "2010", color: "#C7D5BD"}]
}

var page7 = {
  title: "Public Art in the Southwest",
  bbox:[[39.949747745342944, -75.27252746582031], [39.88442543413277, -75.14755798339844]],
  startYear: 0,
  endYear: 1000000,
  popup: false,
  entryLengend: [{year: "1960", color: "#f7523c"}, {year: "1970", color: "#5D4253"}, 
  {year: "1980", color: "#E08CB0"}, {year: "1990", color: "#F7DBB3"}, {year: "2000", color: "#CD9457"},
  {year: "2010", color: "#C7D5BD"}]
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
  var nextPage = currentPage +1
  currentPage = nextPage
  buildPage(slides[nextPage])
}

var prevPage = function(){
  //event handling for going backward in slideshow
  var prevPage = currentPage -1
  currentPage = prevPage
  buildPage(slides[prevPage])
}

var buildPage = function(pageDefinition){
  //build up a "slide" given a page definition
  //console.log(featureGroup)
  tearDown()
  //console.log(featureGroup)
  //featureGroup.map(function(m){
  //  map.removeLayer(m)
  //});


  map.fitBounds(pageDefinition.bbox)
  console.log(pageDefinition.bbox)
  console.log(currentPage)

  var filtered = _.filter(data,function(row){
    return (row.date_ >= pageDefinition.startYear && row.date_ <= pageDefinition.endYear)
  })

  console.log(filtered)

  console.log(featureGroup)

  //filter data
  //for (var i = 0; i < filtered.length - 1; i++){
  //  pageFeature = L.geoJson(filtered[i]["the_geom_geojson"], {
  //    style: myStyle
  //  }).addTo(map).bindPopup(filtered[i]["artist"]).openPopup()
  // }

  for (var i = 0; i < filtered.length - 1; i++){
    //To see if there are multiple polygons in a row.
    //console.log(filtered[i]["the_geom_geojson"]["coordinates"][0][0][0].length==undefined)
    if(filtered[i]["the_geom_geojson"]["coordinates"][0][0][0].length==undefined){
      var lng = filtered[i]["the_geom_geojson"]["coordinates"][0][0][0]
      var lat = filtered[i]["the_geom_geojson"]["coordinates"][0][0][1]
    }else{
      var lng = filtered[i]["the_geom_geojson"]["coordinates"][0][0][0][0]
      var lat = filtered[i]["the_geom_geojson"]["coordinates"][0][0][0][1]
    }

    //feature = L.marker([lat, lng],{icon: myIcon1})
    if(filtered[i]["date_"] >= 1960 && filtered[i]["date_"] < 1970){
      feature = L.marker([lat, lng],{icon: myIcon1})
    }
    else if(filtered[i]["date_"] >= 1970 && filtered[i]["date_"] < 1980){
      feature = L.marker([lat, lng],{icon: myIcon2})
    }
    else if(filtered[i]["date_"] >= 1980 && filtered[i]["date_"] < 1990){
      feature = L.marker([lat, lng],{icon: myIcon3})
    }
    else if(filtered[i]["date_"] >= 1990 && filtered[i]["date_"] < 2000){
      feature = L.marker([lat, lng],{icon: myIcon4})
    }
    else if(filtered[i]["date_"] >= 2000 && filtered[i]["date_"] < 2010){
      feature = L.marker([lat, lng],{icon: myIcon5})
    }
    else{
      feature = L.marker([lat, lng],{icon: myIcon6})
   }

    featureGroup.push(feature)

    artist = filtered[i]["artist"]
    artistGroup.push(artist)
   }

  //Avoid openPopup() affecting the bounds!
  len = filtered.length

  if (pageDefinition.popup == true){
    for (var i = 0; i < len - 1; i++){
     featureGroup[i].addTo(map).bindPopup(artistGroup[i]).openPopup()
    }
  }else{
    for (var i = 0; i < len - 1; i++){
      featureGroup[i].addTo(map).bindPopup(artistGroup[i])
     }
  }
  

  $('.my-div-icon1').css({backgroundColor:"#f7523c", borderRadius: "80%", opacity:"60%"})
  $('.my-div-icon2').css({backgroundColor:"#5D4253", borderRadius: "80%", opacity:"60%"})
  $('.my-div-icon3').css({backgroundColor:"#E08CB0", borderRadius: "80%", opacity:"60%"})
  $('.my-div-icon4').css({backgroundColor:"#F7DBB3", borderRadius: "80%", opacity:"60%"})
  $('.my-div-icon5').css({backgroundColor:"#CD9457", borderRadius: "80%", opacity:"60%"})
  $('.my-div-icon6').css({backgroundColor:"#C7D5BD", borderRadius: "80%", opacity:"90%"})


  //modify text
  $('#title').text(pageDefinition.title)
  
  $('#content').text("There are ".concat(len.toString()," art installations built within this period. Click on the marker to see whose work it is."))

  
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

  //modify legend
  var newLegend = function (entry){
    return (`<li ><span style='background:${entry.color};'></span>${entry.year}s</li>`)
    }
  entry = pageDefinition.entryLengend
  $(".legend-labels").html(entry.map(newLegend).join(" "))
  
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
    for (var i = 0; i < parsedData.rows.length - 1; i++){
    //To see if there are multiple polygons in a row.
    //console.log(parsedData.rows[i]["the_geom_geojson"]["coordinates"][0][0][0].length==undefined)
    if(parsedData.rows[i]["the_geom_geojson"]["coordinates"][0][0][0].length==undefined){
      var lng = parsedData.rows[i]["the_geom_geojson"]["coordinates"][0][0][0]
      var lat = parsedData.rows[i]["the_geom_geojson"]["coordinates"][0][0][1]
    }else{
      var lng = parsedData.rows[i]["the_geom_geojson"]["coordinates"][0][0][0][0]
      var lat = parsedData.rows[i]["the_geom_geojson"]["coordinates"][0][0][0][1]
    }


    if(parsedData.rows[i]["date_"] >= 1960 && parsedData.rows[i]["date_"] < 1970){
      feature = L.marker([lat, lng],{icon: myIcon1})
      featureGroup.push(feature)
    }
    else if(parsedData.rows[i]["date_"] >= 1970 && parsedData.rows[i]["date_"] < 1980){
      feature = L.marker([lat, lng],{icon: myIcon2})
      featureGroup.push(feature)
    }
    else if(parsedData.rows[i]["date_"] >= 1980 && parsedData.rows[i]["date_"] < 1990){
      feature = L.marker([lat, lng],{icon: myIcon3})
      featureGroup.push(feature)
    }
    else if(parsedData.rows[i]["date_"] >= 1990 && parsedData.rows[i]["date_"] < 2000){
      feature = L.marker([lat, lng],{icon: myIcon4})
      featureGroup.push(feature)
    }
    else if(parsedData.rows[i]["date_"] >= 2000 && parsedData.rows[i]["date_"] < 2010){
      feature = L.marker([lat, lng],{icon: myIcon5})
      featureGroup.push(feature)
    }
    else{
      feature = L.marker([lat, lng],{icon: myIcon6})
      featureGroup.push(feature)
   }
  }

   data = parsedData.rows
   
   featureGroup.forEach(function(marker){
     marker.addTo(map)
   })

   $('.my-div-icon1').css({backgroundColor:"#f7523c", borderRadius: "80%", opacity:"60%"})
   $('.my-div-icon2').css({backgroundColor:"#5D4253", borderRadius: "80%", opacity:"60%"})
   $('.my-div-icon3').css({backgroundColor:"#E08CB0", borderRadius: "80%", opacity:"60%"})
   $('.my-div-icon4').css({backgroundColor:"#F7DBB3", borderRadius: "80%", opacity:"60%"})
   $('.my-div-icon5').css({backgroundColor:"#CD9457", borderRadius: "80%", opacity:"60%"})
   $('.my-div-icon6').css({backgroundColor:"#C7D5BD", borderRadius: "80%", opacity:"90%"})


   console.log(featureGroup)

   
  });
  $('#next').click(nextPage)
  $('#prev').click(prevPage)
});

