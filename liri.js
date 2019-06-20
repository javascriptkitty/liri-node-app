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
        console.log("date: " + dateFormated + "\n");
        console.log("_______________________________");
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
  var Spotify = require("node-spotify-api");
  var spotify = new Spotify(keys.spotify);
  input.replace(" ", "%20");
  spotify.search({ type: "track", query: input }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(JSON.stringify(data.tracks.items, null, "\t"));

    for (var i = 0; i < data.tracks.items.length; i++) {
      var result = data.tracks.items[i];

      console.log("Artist(s): +" + result.artists[0].name);
      console.log("The song's name: " + result.name);
      console.log("A preview link of the song: " + result.preview_url);
      console.log("The album: " + result.album.name + "\n");
      console.log("_______________________________");
    }
  });
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

function displayRandom() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);

    var dataArr = data.split("\n");

    for (var i = 0; i < dataArr.length; i++) {
      action = dataArr[i][0];
      input = dataArr[i][1];
      return action + " " + input;
    }
  });
}
