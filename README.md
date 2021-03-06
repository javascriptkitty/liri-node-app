# liri-node-app

LIRI stands for Language Interpretation and Recognition Interface. It's a command line node app that queries Spotify, Bands in Town and OMDB for songs, bands and movies.

## Description

liri.js can take in one of the following commands:

- concert-this &#60;artist/band name&#62;
  This will search the Bands in Town Artist Events API for an artist and render information about each event.
  ![Site screenshort](https://github.com/javascriptkitty/liri-node-app/blob/master/images/concert.gif)

- spotify-this-song &#60;song name&#62;
  This will show information about a song.
  ![Site screenshort](https://github.com/javascriptkitty/liri-node-app/blob/master/images/spotify.gif)

- movie-this &#60;movie name&#62;
  This will search the OMDB API for an movie and render information about a movie.
  ![Site screenshort](https://github.com/javascriptkitty/liri-node-app/blob/master/images/movie.gif)

- do-what-it-says
  This will read random.txt and and supply a command to LIRI.
  ![Site screenshort](https://github.com/javascriptkitty/liri-node-app/blob/master/images/do.gif)

Rendered information will be displayed to the terminal, as well as being logged to a file named `log.txt`.

## Example Usage

node liri.js spotify-this-song 'All the Small Things'

## Technoligies Used

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Node packages:](https://developer.mozilla.org/ru/docs/Web/CSS)

* [moment](https://www.npmjs.com/package/moment)
* [axios](https://www.npmjs.com/package/axios)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)

## Author

Cristina Alekseeva
