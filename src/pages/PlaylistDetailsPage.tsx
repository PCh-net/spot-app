// pages/PlaylistDetailsPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import PlaylistsPage from './PlaylistsPage';

interface ExternalUrls {
  spotify: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Artist {
  external_urls: ExternalUrls;
  genres?: string[];
  href: string;
  id: string;
  images?: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: { reason: string };
  type: string;
  uri: string;
  artists: Artist[];
}

interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string; ean?: string; upc?: string };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: any;
  restrictions?: { reason: string };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

interface AddedBy {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

interface PlaylistItem {
  added_at: string;
  added_by: AddedBy;
  is_local: boolean;
  track: Track;
}

interface SpotifyApiResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: PlaylistItem[];
}

interface SpotifyTrackItem {
  added_at: string;
  added_by: AddedBy;
  is_local: boolean;
  track: Track;
}

const PlaylistDetailsPage = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const handlePlayTrack = (trackId: string | null) => {
    setPlayingTrackId(trackId);
};

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
    const fetchPlaylistTracks = async () => {
      if (!accessToken || !playlistId) return;
  
      try {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=30`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const fetchedTracks = response.data.items.map((item: SpotifyTrackItem) => item.track);
        setTracks(fetchedTracks);
      } catch (error) {
        console.error('Error fetching playlist tracks:', error);
      }
    };
  
    fetchPlaylistTracks();

  }, [accessToken, playlistId]);


  if (!tracks) {
    return <div className='container mx-auto p-4'>
      <h3 className='text-sky-100'>Loading...</h3>
      <img className="h-full md:h-full lg:h-full" src='/images/loader-300.gif' alt='Loader' />
      </div>
  }



  return (
    <div className="container mx-auto p-4">
      <h1 className='text-2xl md:text-3xl text-sky-100 mb-4'>Playlist Tracks</h1>
      {tracks.map((track, index) => (
      <div key={track.id} className='shadow-lg mt-4'>
        <div className='flex flex-row'>
          <div className='flex basis-2/6'>

            {track.album.images.length > 0 && (
            <div>
              <Link to={`/track/${track.id}`} onClick={() => window.scrollTo(0, 0)}>
              <img 
                src={track.album.images[0]?.url || '/images/logos/Spotify_Icon_RGB_White.png'} 
                alt={track.name}
                onError={(e) => e.currentTarget.src = '/images/logos/Spotify_Icon_RGB_White.png'}
                className="w-full object-cover rounded p-2 shadow-md" 
              />
              </Link>
            </div>
            )}

          </div>
          <div className='flex flex-col basis-4/6 p-2'>
            <h2 className='text-xl md:text-4xl no-underline hover:underline text-sky-100'>{index + 1}. <Link to={`/track/${track.id}`} onClick={() => window.scrollTo(0, 0)}>{track.name}</Link></h2>           
            <p><span className='text-xl md:text-3xl text-sky-200'>Artist(s):</span></p>

            {track.artists.map((artist, index) => (
              <span key={artist.id} className='text-l md:text-2xl no-underline hover:underline text-sky-100'>
                <FontAwesomeIcon className='text-l md:text-2xl text-sky-100 hover:text-sky-400' icon={faInfoCircle} /> <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                {index < track.artists.length - 1 ? ', ' : ''}
              </span>
              
            ))}
            <p className='text-l md:text-2xl text-sky-100'>Popularity: {track.popularity}</p>
            {track.preview_url && (
              <p className='text-m md:text-2xl text-sky-100'>Preview - 30 sec :&emsp;</p>
            )}
            {track.preview_url ? (
                <AudioPlayer 
                  src={track.preview_url} 
                  trackId={track.id} 
                  onPlay={handlePlayTrack} 
                  isPlaying={playingTrackId === track.id}
                />
            ) : (
              <p className='text-l md:text-2xl text-sky-300'>Preview - disable&emsp;</p>
            )}
          </div>
          
        </div>
      </div>
      ))}

    </div>
  );
  
};

export default PlaylistDetailsPage;
