import React, { useContext, useEffect } from "react"
import './top-bar.style.scss';
import { DataContext } from "../../context/DataContext";
import { spotifyUri } from "../../config.js";

const TopBar = ({ token }) => {

    const { setMusicList,spotifyUser, setSpotifyUser } = useContext(DataContext)
    
    useEffect(() => {
        const lastSongSearched = window.localStorage.getItem('lastSongSearched')
        if (lastSongSearched !== undefined) {
            findSongs(lastSongSearched);
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
        const response = await fetch(`${spotifyUri}/search?q=${songName}&type=track&limit=30`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const songsData = await response.json();
        if (songsData.tracks) {
            const songs = songsData.tracks.items.map(x => {
                return {
                    songName: x.name,
                    duration: x.duration_ms,
                    singer: x.artists[0].name,
                    singerId: x.artists[0].id,
                    songId : x.id,
                    albun: x.album.name,
                    albunImage: x.album.images[0].url
                }
            });
            setMusicList(songs)
        }
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
            <div className="top-bar-box3"></div>
        </div>
    )

}

export default TopBar;