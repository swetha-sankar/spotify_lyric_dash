/**
 * Swetha Sankar
 * Component to display current song playing
 */
import React from "react";
import {getLyrics} from 'genius-lyrics-api';
const API_KEY = process.env.REACT_APP_API_KEY;

const CurrentSong = props => {
    // Making API request to genius lyrics
    const options =  {
        apiKey: API_KEY,
        title: props.item.name,
        artist: props.item.artists[0]['name'],
        optimizeQuery: true
    };
    // Using genius lyrics library to simplify request (https://github.com/farshed/genius-lyrics-api)
    getLyrics(options).then((lyrics) => console.log(lyrics));

    return (
        <div className="App">
            <div className="main-wrapper">
                <div className="now-playing__img">
                    <img width={500} height={500} src={props.item.album.images[0].url} alt = {props.item.name}/>
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