import React from "react";
import "./Player.scss";

const Player = props => {
  const backgroundStyles = {
    backgroundImage: `url(${props.item.album ? props.item.album.images[0].url : ""
      })`,
  };

  const progressBarStyles = {
    width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
  };

  return !props.no_data && (
    <div className="play-bar">

      <div className="play-card">
        <img src={props.item.album.images[0].url} />

        <div className="play-card-text">

          <div className="now-playing__name">{props.item.name}</div>

          <div className="now-playing__artist">
            {props.item.artists[0].name}
          </div>

          <div className="now-playing__status">
            {props.is_playing ? "Playing" : "Paused"}
          </div>
        </div>

        <div className="progress">
          <div className="progress__bar" style={progressBarStyles} />
        </div>
      </div>

      <div className="background" style={backgroundStyles} />{" "}</div>

  );
}

export default Player;
