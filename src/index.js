require ('./styles.scss');
// Google Maps
window.initMap = function() {
  var myCenter_mal = new google.maps.LatLng(47.037752, 8.178780);
  var map_malters = new google.maps.Map(document.getElementById('map-malters'), {
    center: myCenter_mal,
    zoom: 14,
  });
  var infowindow_malters = new google.maps.InfoWindow();
  var service_malters = new google.maps.places.PlacesService(map_malters);

  service_malters.getDetails({
    placeId: 'ChIJj3KaerXlj0cRzLJ5NcBXgZs'
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      map_malters.setCenter(place.geometry.location);
      var marker = new google.maps.Marker({
        map: map_malters,
        position: place.geometry.location
      });
      infowindow_malters.setContent('<div><strong>' + place.name + '</strong><br>' +
        place.formatted_address + '</div>');
      google.maps.event.addListener(marker, 'click', function() {
        infowindow_malters.open(map_malters, this);
      });
      google.maps.event.addDomListener(window, 'resize', function() {
        map_malters.setCenter(myCenter_mal);
      });
      infowindow_malters.open(map_malters, marker);
    }
  });

  var myCenter_lu = new google.maps.LatLng(47.043012, 8.312948);
  var map_luzern = new google.maps.Map(document.getElementById('map-luzern'), {
    zoom: 14,
    center: myCenter_lu
  });
  var infowindow_luzern = new google.maps.InfoWindow();
  var service_luzern = new google.maps.places.PlacesService(map_luzern);

  service_luzern.getDetails({
    placeId: 'ChIJkQ5iFbv7j0cR16_McYg_mJM'
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map_luzern,
        position: place.geometry.location,
      });
      infowindow_luzern.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address + '</div>');

      google.maps.event.addListener(marker, 'click', function() {
        infowindow_luzern.open(map_luzern, this);
      });
      infowindow_luzern.open(map_luzern, marker);
    }
  });

};
function loadScript() {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.setAttribute("async","");
      script.setAttribute("defer","");
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBDorBEA20iDeExZx8jHZkFn8aoJLEFl3U&libraries=places&callback=initMap';
      document.body.appendChild(script);
}

window.onload = loadScript;

//SmoothScroll
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}


function elmYPosition(eID) {
  var elm = document.getElementById(eID);
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}


window.smoothScroll = function(eID) {
  var startY = currentYPosition();
  var stopY = elmYPosition(eID);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 100);
  if (speed >= 30) speed = 30;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    hamburger.classList.toggle("is-active");
    navigation.classList.toggle("show");
    return;
  }
  for (var i = startY; i > stopY; i -= step) {
    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  hamburger.classList.toggle("is-active");
  navigation.classList.toggle("show");
};


//Navigation
var hamburger = document.querySelector(".hamburger");
var navigation = document.querySelector(".navigation-list");

hamburger.addEventListener("click", function() {
  hamburger.classList.toggle("is-active");
  navigation.classList.toggle("show");
});

//Scroll
var lastScrollTop = 0;
var link = document.querySelectorAll(".navigation-link");
var icon = document.querySelectorAll(".icon");
var section = document.querySelectorAll(".section-title");
var startText = document.getElementById("start");
var brand = document.getElementById("brand");
window.addEventListener("scroll", function() {
  var position = window.pageYOffset;
  var navigation = document.getElementById("navigation");
  if (position > lastScrollTop) {
    navigation.style.top = "-100%";
  } else {
    navigation.style.top = "0";
  }
  lastScrollTop = position;


  if (position + 50 > elmYPosition("offers")) {
    navigation.classList.add("navscrolled");
    for (var i = 0; i < link.length; i++) {
      link[i].classList.add("navlinkscrolled");
    }
    brand.classList.add("navlinkscrolled");
  } else {
    navigation.classList.remove("navscrolled");
    for (var i = 0; i < link.length; i++) {
      link[i].classList.remove("navlinkscrolled");
    }
    brand.classList.remove("navlinkscrolled");
  }

  for (var i = 0; i < section.length; i++) {
    if (isScrolledIntoView(section[i])) {
      icon[i].classList.add("show-icon");
    }
  }

  startText.style.opacity = 1 - position / 300;
});


function isScrolledIntoView(el) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;

  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  return isVisible;
}
