import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import './search-music-result.style.scss'
import { spotifyUri } from "../../config.js";

import { getLikedSongs } from '../../service/spotify.service';
import NewReleasesComponent from "../new-releases/new-releases.component";
import MusicCardContainerComponent from "./music-card-container.component";
import LikedSongsCardContainerComponent from "./liked-songs-card-container.component";

const SearchMusicListComponent = ({ token }) => {

    const { musicList, likedMusic, setLikedMusic } = useContext(DataContext);


    useEffect(() => {
        GetLikedSongs()
    }, [])


    const GetLikedSongs = async () => {
        const songs = await getLikedSongs();
        setLikedMusic(songs);
    }

    return (
        <>
            <LikedSongsCardContainerComponent likedMusic={likedMusic}/>
            <NewReleasesComponent />
            <MusicCardContainerComponent musicList={musicList} />
        </>
    );
}

export default SearchMusicListComponent;