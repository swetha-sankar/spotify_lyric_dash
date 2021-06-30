import React, {Component} from 'react';
import * as $ from "jquery";
import {authEndpoint, clientId, redirectUri, scopes} from "./config";
import hash from "./hash";
import CurrentSong from "./components/CurrentSong";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            item: {
                album: {
                    images: [{url: ""}]
                },
                name: "",
                artists: [{name: ""}],
            },
            is_playing: "Paused",
            no_data: false,
        };

        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        let _token = hash.access_token;

        if (_token) {
            this.setState({
                token: _token
            });
            this.getCurrentSong(_token);
        }
        this.interval = setInterval(() => this.tick(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        if (this.state.token) {
            this.getCurrentSong(this.state.token);
        }
    }


    getCurrentSong(token) {
        // Uses Spotify API to determine current song playing

        $.ajax({
            url: "https://api.spotify.com/v1/me/player",
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                if (!data) {
                    this.setState({
                        no_data: true,
                    });
                    return;
                }
                this.setState({
                    item: data.item,
                    is_playing: data.is_playing,
                    no_data: false
                });
            }
        });
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {!this.state.token && (
                        <a
                            className="btn btn--loginApp-link"
                            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                                "%20"
                            )}&response_type=token&show_dialog=true`}
                        >
                            First, Log In to Spotify
                        </a>
                    )}

                    {this.state.token && !this.state.no_data && (
                        <CurrentSong
                            item={this.state.item}
                            is_playing={this.state.is_playing}
                        />
                        ) }

                    {this.state.no_data && (
                        <p>
                            Nothing currently playing
                        </p>
                    )}
                </header>
            </div>
        );
    }
}

export default App;