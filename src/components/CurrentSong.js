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

    // Format the music page (use Bulma tile to put everything from left to right)
    return (
        <div>
            <div className='tile'>
                <div className='tile is-parent is-vertical'>
                    <div className='image is-size-5'>
                        <img src={props.item.album.images[0].url} alt={props.item.name}/>
                    </div>
                        <div className='headtext'>
                            <div className = 'subheader'>
                                {props.is_playing ? "Now Playing: " : "Paused: "}
                            </div>
                            {props.item.name}
                            <br/>
                            <div className='subheader'>
                                {props.item.artists[0].name}
                            </div>
                        </div>

                </div>
                <div>
                </div>
                <div className = 'tile is-child'>
                <pre className='lyricstyle'>
            {lyrics}
            </pre>
                    </div>
            </div>
        </div>
    );
}

export default CurrentSong;