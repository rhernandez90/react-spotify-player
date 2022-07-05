import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider  = ({  children }) => {

    const [musicList, setMusicList] = useState([]);
    const [spotifyUser, setSpotifyUser] = useState({display_name:''});
    const [likedMusic, setLikedMusic] = useState([]);


    return (
        <DataContext.Provider value={{
            musicList,
            setMusicList,
            spotifyUser, 
            setSpotifyUser,
            likedMusic, 
            setLikedMusic
        }}>
        { children }  
      </DataContext.Provider>
    );
}