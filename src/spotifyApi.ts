// spotifyApi.ts
import axios from 'axios';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

// Funkcja do uzyskiwania tokena dostępu
async function getAccessToken() {
  const tokenCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers: {
        'Authorization': `Basic ${tokenCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error during Spotify access token retrieval:', error);
    return null;
  }
}

// Tworzenie instancji Axios
export const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

// Interceptor do dodawania tokena do każdego żądania
spotifyApi.interceptors.request.use(async config => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

