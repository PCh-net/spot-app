// pages/AlbumDetailsPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import AudioPlayer from '../components/AudioPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCaretRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface Track {
  id: string;
  name: string;
  duration_ms: number;
  preview_url: string;
  track_number: string;
  external_urls: {
    spotify: string;
  };

}

interface AlbumDetails {
  id: string;
  name: string;
  artists: [{ name: string }]; // Lista artystów
  images: [{ url: string }];
  total_tracks: string;
  release_date: string;  
  tracks: {
    items: Track[];
  }

  // 
}


const AlbumDetailsPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const handlePlayTrack = (trackId: string | null) => {
    setPlayingTrackId(trackId);
};

  const formatDuration = (ms: number): string => {
    let seconds: number = Math.floor(ms / 1000);
    let minutes: number = Math.floor(seconds / 60);
    seconds = seconds % 60;
    let hours: number = Math.floor(minutes / 60);
    minutes = minutes % 60;
  
    const hoursStr: string = hours.toString().padStart(2, '0');
    const minutesStr: string = minutes.toString().padStart(2, '0');
    const secondsStr: string = seconds.toString().padStart(2, '0');
  
    return hours !== 0 ? `${hoursStr}:${minutesStr}:${secondsStr}` : `${minutesStr}:${secondsStr}`;
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
    if (!accessToken || !albumId) return;

    const fetchAlbumDetails = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setAlbumDetails(response.data);
      } catch (error) {
        console.error('Error fetching album details:', error);
      }
    };

    fetchAlbumDetails();
    console.log(albumDetails);
  }, [albumId, accessToken]);


  
  if (!albumDetails) {
    return <div className='container mx-auto p-4'>
      <h3 className='text-sky-100'>Loading...</h3>
      <img className="h-full md:h-full lg:h-full" src='/images/loader-300.gif' alt='Loader' />
      </div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex-row bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded-2xl shadow-md p-4 drop-shadow-xl mt-4">
      <h1 className='text-2xl md:text-6xl text-sky-100'><span className='text-sky-300'>Album: </span>{albumDetails.name}</h1>
      <p className='text-l md:text-4xl text-sky-100'><span className='text-sky-300'>Artist(s): </span>{albumDetails.artists.map(artist => artist.name).join(', ')}</p>
      <p className='text-m md:text-3xl text-sky-100'><span className='text-sky-300'>Total tracks: </span>{albumDetails.total_tracks}</p>
      <p className='text-m md:text-2xl text-sky-100'><span className='text-sky-300'>Release Date: </span>{albumDetails.release_date}</p>

      {albumDetails && albumDetails.images && albumDetails.images.length > 0 && (
          <img 
              className='w-128 md:w-256 lg:w-256 rounded p-4' 
              src={albumDetails.images[0].url} 
              alt={albumDetails.name} 
          />
      )}

      <h2 className='text-xl md:text-3xl mt-2 text-sky-100'>Tracks:</h2>
      
      {albumDetails.tracks.items.length > 0 && (
      albumDetails.tracks.items.map((track, index) => (
        <React.Fragment key={index}>
          <div className='flex flex-col shadow-lg'>
            <div className='mt-4'>
                <p className='text-l md:text-3xl text-sky-100 hover:text-sky-200'>
                <span>{track.track_number} <FontAwesomeIcon className='text-l text-sky-100' icon={faCaretRight} /> <Link to={`/track/${track.id}`}>{track.name}</Link>
              </span></p>
            </div>
              
            <div className='flex flex-row'>
            {track.preview_url && (
              <p className='text-m md:text-3xl text-sky-100'>Preview - 30 sec :&emsp;</p>
            )}

            {track.preview_url ? (
                <AudioPlayer 
                  src={track.preview_url} 
                  trackId={track.id} 
                  onPlay={handlePlayTrack} 
                  isPlaying={playingTrackId === track.id}
                />
            ) : (
              <p className='text-l md:text-3xl text-sky-300'>Preview - disable&emsp;</p>
            )}
            <Link to={`/track/${track.id}`} onClick={() => window.scrollTo(0, 0)} >
              <FontAwesomeIcon className='text-xl md:text-5xl mt-1 md:mt-2 lg:mt-3 text-sky-100 hover:text-sky-200 mr-12 md:mr-6' icon={faInfoCircle} />
              </Link>
            <Link to={`${track.external_urls.spotify}`} target="_blank" rel="noopener noreferrer">
              <img className="h-6 md:h-12 lg:h-12 width-auto" src='/images/logos/Spotify_Icon_RGB_Green.png' alt='Listen on Spotify' />
            </Link>
            </div>
          </div>
        </React.Fragment>
      ))
    )}


        <CustomButton onClick={() => { window.history.back(); }} fullWidth={true} size='text-xl md:text-2xl' >
          <FontAwesomeIcon icon={faCircleChevronLeft} />&emsp;Back to list
        </CustomButton>

      </div>
    </div>
  );
};

export default AlbumDetailsPage;