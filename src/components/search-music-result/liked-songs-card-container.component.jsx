import React from 'react';


const LikedSongsCardContainerComponent = ({ likedMusic }) => {

    const likedSongsCards = likedMusic.map(x => {
        const duration = x.duration / 1000 / 60;
        return (
            <div className="liked-song-card">
                <div className="liked-song-name">
                    <strong >{x.songName}</strong>
                </div>
                <div>
                    <strong className="liked-singer-name">{x.singer}</strong>
                </div>
                <div className="liked-duration">
                    <strong>{duration.toFixed(2)}</strong>
                </div>
                <hr className="split-line"></hr>
            </div>
        );
    })

    return (
        <div className="liked-songs-card-container">
            <h4 className="title">Liked Songs</h4>
            <br/>
            <div className='song-container'>
                {likedSongsCards}
            </div>
        </div>
    );
}

export default LikedSongsCardContainerComponent;