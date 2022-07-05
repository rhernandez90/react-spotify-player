import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes, spotifyUri } from "./config.js";
import hash from "./hash";
import Player from "./Player";
import TopBar from "./components/top-bar/top-bar";
import SearchMusicListComponent from "./components/search-music-result/search-music-result.component"
import "./App.css";
import { DataProvider } from "./context/DataContext.js";

class App extends Component {
  constructor() {
    super();



    this.state = {
      token:   null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
    };


  }



  componentDidMount() {

    let _token;
    let tokenStorage = null//window.localStorage.getItem("token")
    console.log(hash);
    if (tokenStorage === null){
      _token = hash.access_token
      
      if (_token !== undefined  ) 
        window.localStorage.setItem("token", _token)

    }
    else
      _token = tokenStorage;
    

    if (_token) {
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }

    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    if (this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
    }
  }


  getCurrentlyPlaying = (token) => {

    $.ajax({
      url: `${spotifyUri}/me/player`,
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
          progress_ms: data.progress_ms,
          no_data: false
        });
      }
    });
  }

  render() {
    return (
      <div className="App">

        {this.state.token && (
          <DataProvider>
            <TopBar token={this.state.token} />
            <SearchMusicListComponent token={this.state.token} />
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.state.progress_ms}
              no_data={this.state.no_data}
            />
          </DataProvider>
        )}

        {!this.state.token && (
          <header className="app-boddy">
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          </header>
        )}
      </div>
    );
  }
}

export default App;
