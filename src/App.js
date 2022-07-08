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
      if (hash.access_token !== undefined  ) {
        _token = hash.access_token
        window.localStorage.setItem("token", _token)
      }
    }
    else
      _token = tokenStorage;
    

    if (_token) {
      this.setState({
        token: _token
      });
    }
  }

  componentWillUnmount() {
  }


  render() {
    return (
      <div className="App">

        {this.state.token && (
          <DataProvider>
            <TopBar token={this.state.token} />
            <SearchMusicListComponent token={this.state.token} />
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
