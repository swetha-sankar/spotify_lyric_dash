/**
 * Swetha Sankar
 * Displays current song, album art, artist, and lyrics
 */
// import react hooks useState
import React, {useState} from "react";
import {getLyrics} from 'genius-lyrics-api';

const API_KEY = process.env.REACT_APP_API_KEY;

const CurrentSong = props => {
    // Making API request to genius lyrics
    const options = {
        apiKey: API_KEY,
        title: props.item.name,
        artist: props.item.artists[0]['name'],
        optimizeQuery: true
    };
    // Using genius lyrics library to simplify request (https://github.com/farshed/genius-lyrics-api)
    const [lyrics, setLyrics] = useState(null);
    // Store the promise in the data
    getLyrics(options).then((lyrics) => setLyrics(lyrics));

    return (
        <div>
            <div>
                <img width={500} height={500} src={props.item.album.images[0].url} alt={props.item.name}/>
                <div>
                    {props.item.name}
                </div>
                <div className = "is-justify-content-right">
                    {props.item.artists[0].name}
                </div>
            </div>
            <div className = "columns is-vertical">
            <pre>
            {lyrics}
            </pre>
                </div>
        </div>
    );
}

export default CurrentSong;