import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import './search-music-result.style.scss'
import { spotifyUri } from "../../config.js";
import { FaHeart } from 'react-icons/fa';
import { getLikedSongs } from '../../service/spotify.service';

const SearchMusicListComponent = ({ token }) => {

    const { musicList, likedMusic, setLikedMusic } = useContext(DataContext);


    useEffect(() => {
        GetLikedSongs()
    }, [])


    const GetLikedSongs = async () => {
        const songs = await getLikedSongs();
        setLikedMusic(songs);
    }


    // const getLikedSongs = async (songName) => {
    //     const response = await fetch(`${spotifyUri}/me/tracks?limit=50`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //     const songsData = await response.json();
    //     if (songsData.items) {
    //         const songs = songsData.items.map(x => {
    //             return {
    //                 songName: x.track.name,
    //                 duration: x.track.duration_ms,
    //                 singer: x.track.artists[0].name,
    //                 singerId: x.track.artists[0].id,
    //                 songId: x.track.id,
    //                 albun: x.track.album.name,
    //                 albunImage: x.track.album.images[0].url
    //             }
    //         });
    //         setLikedMusic(songs)
    //     }
    // }


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
                    <span><FaHeart /></span>
                </div>
                <hr className="split-line"></hr>

            </div>
        );
    })

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
        <>
            <h3 className="liked-song-title">Liked Songs</h3>
            <div className="liked-songs-card-container">

                {likedSongsCards}
            </div>
            <div className="music-card-container">
                {musicCards}
            </div>
        </>
    );
}

export default SearchMusicListComponent;