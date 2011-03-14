plugin.onJoin = function(event) {
  console.log("joining room: ", event);

  if (Talker.getRoomName() != 'Limassol') {
    console.log("Not Limassol leaving...");
    return;
  }
  console.log("Limassol continuing...");

  var showMapLink = function(position) {
    console.log("Got position:", position);
    var latitude = position.coords.latitude,
        longitude = position.coords.longitude;

    var lookupUrl = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=false?callback=?";

    $.getJSON(lookupUrl, function(data) {
      var currentLocation = "";

      if (data.status === 'OK') {
        console.log("Got address:", data);
        currentLocation = " Location: <a href='http://maps.google.com/?ie=UTF8&ll=" + latitude + "," + longitude + "&z=8'>" + data.results[0].formatted_address + "</a>";
      }

      console.log("Inserting notice:", currentLocation);
      Talker.insertNotice(event, h(event.user.name) + ' has joined the room' + h(currentLocation));
    });
  };

  if (navigator && navigator.geolocation) {
    console.log("Got geolocation trying...");
    navigator.geolocation.getCurrentPosition(showMapLink, function(error) {
      console.log("Error geolocating", error);
      Talker.insertNotice(event, h(event.user.name) + ' has joined the room.' + ' Location: <i>unknown</i>');
    }, {timeout: 1000 * 5,
        maximumAge: 1000 * 60 * 60});
  }
  else {
    console.log("Shame. No geolocation :(");
    Talker.insertNotice(event, h(event.user.name) + ' has joined the room.' + ' Location: <i>unknown</i>');
  }
}

