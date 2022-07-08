export const authEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "b695626c93724a169cb828cd2fd18eef";
export const redirectUri = "http://localhost:3000/redirect";
export const spotifyUri = "https://api.spotify.com/v1";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "streaming",
    "user-library-read",
    "user-library-modify"
];

export const token = window.localStorage.getItem("token");
