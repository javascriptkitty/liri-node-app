require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var action = "concert-this";
var input = "vampire weekend";

input.replace(" ", "%20");

switch (action) {
  case "concert-this":
    displayConsert();
    break;
  case "spotify-this-song":
    displaySong();
    break;
  case "movie-this":
    displayMovie();
    break;
  case "do-what-it-says":
    displayRandom();
    break;
}

function displayConsert() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        input +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      //console.log(response);
      var result = response.data;
      for (var i = 0; i < result.length; i++) {
        var date = moment(result[i].datetime, "YYYY-MM-DDTHH:mm:ss");
        var dateFormated = date.format("MM/DD/YYYY");
        console.log("venue: " + result[i].venue.name);
        console.log(
          "location: " + result[i].venue.city + "," + result[i].venue.country
        );
        console.log("date: " + dateFormated);
      }
    })
    .catch(function(error) {
      if (error.result) {
        console.log(error.result.data);
        console.log(error.result.status);
        console.log(error.result.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

//   var spotify = new Spotify(keys.spotify);
