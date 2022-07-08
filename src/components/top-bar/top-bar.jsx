import React, { useContext, useEffect } from "react"
import './top-bar.style.scss';
import { DataContext } from "../../context/DataContext";
import { spotifyUri } from "../../config.js";
import { searchSongs } from '../../service/spotify.service';
import { Outlet, Link } from 'react-router-dom'


const TopBar = ({ token }) => {

    const { setMusicList,spotifyUser, setSpotifyUser } = useContext(DataContext)
    
    useEffect(() => {
        const lastSongSearched = window.localStorage.getItem('lastSongSearched')
        if (lastSongSearched !== undefined) {
            findSongs(lastSongSearched)
        }
        getUserData();
    }, [])


    const searchHandler = (event) => {
        if (event.key === 'Enter') {
            const songName = event.target.value;
            window.localStorage.setItem('lastSongSearched', songName);
            findSongs(songName);
        }
    }


    const findSongs = async (songName) => {
        const songs = await searchSongs(songName);
        setMusicList(songs)
    }


    const getUserData = async() => {
        const response = await fetch(`${spotifyUri}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const user = await response.json();
        setSpotifyUser(user);
        console.log(user);
    }


    return (
        <div className="top-bar">
            <div className="top-bar-box1">{spotifyUser.display_name}</div>
            <div className="top-bar-box2">
                <input className="search-bar" type="text" placeholder="Search" onKeyDown={searchHandler} />
            </div>
            <div className="top-bar-box3">
                <Link className='nav-link' to='my-library'>
                    My Library
                </Link>
            </div>
        </div>
    )

}

export default TopBar;