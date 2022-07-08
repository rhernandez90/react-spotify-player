import React from 'react';
import { FaHeart, FaPlus } from 'react-icons/fa';

const MusicCardContainerComponent = ({ musicList }) => {


    const musicCards = musicList.map(x => {
        const duration = x.duration / 1000 / 60;
        return (
            <div className="card">
                {/* <hr className="split-line"></hr> */}
                <div className="singer-img">
                    <img src={x.albunImage} alt='Loading' />
                </div>
                <div className="song-name">
                    <strong >{x.songName}</strong>
                </div>
                <div>
                    <strong className="singer-name">{x.singer}</strong>
                </div>
                <div className="duration">
                    <strong>{duration.toFixed(2)}</strong>
                </div>
                <div className="duration">
                    <span><FaPlus /></span>
                </div>
                <hr className="split-line"></hr>

            </div>
        );
    })

    
    return (
        <div className="music-card-container">
            {musicCards}
        </div>
    );
}

export default MusicCardContainerComponent;