require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

var action = process.argv[2];
var input = process.argv[3];

if (action == "do-what-it-says") {
  var result = readInputFromFile();
  for (var i = 0; i < result.length; i++) {
    action = result[i][0];
    input = result[i][1];
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
    }
  }
}

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
}

function print(msg) {
  console.log(msg);
  // TODO: log to file
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
      //print(response);
      var result = response.data;
      for (var i = 0; i < result.length; i++) {
        var date = moment(result[i].datetime, "YYYY-MM-DDTHH:mm:ss");
        var dateFormated = date.format("MM/DD/YYYY");
        print("venue: " + result[i].venue.name);
        print(
          "location: " + result[i].venue.city + "," + result[i].venue.country
        );
        print("date: " + dateFormated + "\n");
        print("------------------------------");
      }
    })
    .catch(function(error) {
      logError(error);
    });
}

function logError(error) {
  if (error.result) {
    print(error.result.data);
    print(error.result.status);
    print(error.result.headers);
  } else if (error.request) {
    print(error.request);
  } else {
    print("Error", error.message);
  }
  print(error.config);
}

function displaySong() {
  var Spotify = require("node-spotify-api");
  var spotify = new Spotify(keys.spotify);
  input.replace(" ", "%20");
  spotify.search({ type: "track", query: input }, function(err, data) {
    if (err) {
      return print("Error occurred: " + err);
    }

    print(JSON.stringify(data.tracks.items, null, "\t"));

    for (var i = 0; i < data.tracks.items.length; i++) {
      var result = data.tracks.items[i];

      print("Artist(s): +" + result.artists[0].name);
      print("The song's name: " + result.name);
      print("A preview link of the song: " + result.preview_url);
      print("The album: " + result.album.name + "\n");
      print("------------------------------");
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
      print("title: " + result.Title);
      print("year: " + result.Year);
      print("IMDB Rating: " + result.Ratings[0].Value);
      print("Rotten Tomatoes Rating: " + result.Ratings[1].Value);
      print("country: " + result.Country);
      print("language: " + result.Language);
      print("plot: " + result.Plot);
      print("actors: " + result.Actors);
    })
    .catch(function(error) {
      logError(error);
    });
}

function readInputFromFile() {
  var data = fs.readFileSync("random.txt", "utf8");

  var dataArrays = data.split("\n");
  var inputArr = [];
  for (var i = 0; i < dataArrays.length; i++) {
    var dataArr = dataArrays[0].split(",");
    var action = dataArr[0];
    var input = dataArr[1];
    var input = input.substring(1, input.length - 1);
    inputArr.push([action, input]);
  }
  return inputArr;
}
