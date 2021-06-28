import React from "react";
import { getLyrics, getSong } from 'genius-lyrics-api';

const options =  {
	apiKey: process.env.REACT_APP_API_KEY,
	title: 'Blinding Lights',
	artist: 'The Weeknd',
	optimizeQuery: true
};

getLyrics(options).then((lyrics) => console.log(lyrics));

getSong(options).then((song) =>
	console.log(`
	${song.id}
	${song.url}
	${song.albumArt}
	${song.lyrics}`)
);
const CurrentSong = props => {
  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img   width={500} height={500} src={props.item.album.images[0].url} />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">
              <div className = "title is-3">
              {props.item.name}
              </div>
          </div>
          <div className="now-playing__artist">
              <div className = "subtitle is-3">
            {props.item.artists[0].name}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentSong;