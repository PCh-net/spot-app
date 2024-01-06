// pages/PlaylistsPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];

}

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  const getAccessToken = useCallback(async () => {
    const tokenCredentials = btoa(`${clientId}:${clientSecret}`);
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
  }, [clientId, clientSecret]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };

    fetchAccessToken();
  }, [getAccessToken]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchFeaturedPlaylists = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setPlaylists(response.data.playlists.items);
      } catch (error) {
        console.error('Error fetching featured playlists:', error);
      }
    };

    fetchFeaturedPlaylists();
    console.log(playlists);
  }, [accessToken]);

  if (!playlists) {
    return <div className='container mx-auto p-4'>
      <h3 className='text-sky-100'>Loading...</h3>
      <img className="h-full md:h-full lg:h-full" src='/images/loader-300.gif' alt='Loader' />
      </div>
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-sky-100 mb-4">Featured Playlists</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {playlists.map(playlist => (
        <div key={playlist.id} className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
            {playlist.images.length > 0 && (
              <Link to={`/playlist/${playlist.id}`} onClick={() => window.scrollTo(0, 0)} ><img src={playlist.images[0].url} alt={playlist.name} /></Link>
            )}
          <h2 className='text-l text-sky-100'>{playlist.name}</h2>
        </div>
        ))}
      </div>

    </div>
  );
};

export default PlaylistsPage;
