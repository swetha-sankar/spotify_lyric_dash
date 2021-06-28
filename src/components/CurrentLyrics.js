import React from "react";
const CurrentLyrics = props => {
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

export default CurrentLyrics;