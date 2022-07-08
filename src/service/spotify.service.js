import { authEndpoint, clientId, redirectUri, scopes, spotifyUri, token } from "../config.js";




export const searchSongs = async (songName) =>{

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
            return songs;
        }
        return [];
    
}


export const getLikedSongs = async () => {
    const response = await fetch(`${spotifyUri}/me/tracks?limit=50`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const songsData = await response.json();
    if (songsData.items) {
        const songs = songsData.items.map(x => {
            return {
                songName: x.track.name,
                duration: x.track.duration_ms,
                singer: x.track.artists[0].name,
                singerId: x.track.artists[0].id,
                songId: x.track.id,
                albun: x.track.album.name,
                albunImage: x.track.album.images[0].url
            }
        });
        return songs;
    }
    return [];
}