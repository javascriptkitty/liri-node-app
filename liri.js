require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var action = process.argv[2];
var input = process.argv[3];

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
  input.replace(" ", "%20");
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

function displaySong() {
  //   var spotify = new Spotify(keys.spotify);
}

function displayMovie() {
  var url;
  if (input !== undefined) {
    input.replace(" ", "+");
    url =
      "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
  } else {
    url = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";
  }

  axios
    .get(url)
    .then(function(response) {
      var result = response.data;
      //console.log(response.data);
      console.log("title: " + result.Title);
      console.log("year: " + result.Year);
      console.log("IMDB Rating: " + result.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + result.Ratings[1].Value);
      console.log("country: " + result.Country);
      console.log("language: " + result.Language);
      console.log("plot: " + result.Plot);
      console.log("actors: " + result.Actors);
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
