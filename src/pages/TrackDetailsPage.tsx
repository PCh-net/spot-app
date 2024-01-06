// pages/TrackDetailsPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MiniButton from '../components/MiniButton';
import CustomButton from '../components/CustomButton';
import XMiniButton from '../components/XMiniButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCaretRight, faInfoCircle, faStar } from '@fortawesome/free-solid-svg-icons';

interface Image {
  height: number;
  url: string;
  width: number;
}

interface Artist {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: string;
}

interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface TrackDetails {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
}


const TrackDetailsPage = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const [trackDetails, setTrackDetails] = useState<TrackDetails | null>(null);
  const [accessToken, setAccessToken] = useState(null);
  
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

    getAccessToken().then(token => {
      setAccessToken(token);
    });
  }, [getAccessToken]);

  useEffect(() => {
    if (!accessToken || !trackId) return;


    const fetchTrackDetails = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setTrackDetails(response.data);
      } catch (error) {
        console.error('Error fetching track details:', error);
      }
    };

    fetchTrackDetails();
  }, [accessToken, trackId]);

  if (!trackDetails) {
    return <div className='container mx-auto p-4'>
      <h3 className='text-sky-100'>Loading...</h3>
      <img className="h-full md:h-full lg:h-full" src='/images/loader-300.gif' alt='Loader' />
      </div>
  }

  return (

    
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded-2xl shadow-md p-4 drop-shadow-xl mt-4">
        <h1 className='text-2xl text-sky-100'><span className='text-sky-300'>Track: </span>{trackDetails.name}</h1>
        <p className='text-m text-sky-100'><span className='text-sky-300'>Popularity: </span>{trackDetails.popularity}/100</p>
        <p className='text-m text-sky-100'><span className='text-sky-300'>Duration: </span>
        {formatDuration(trackDetails.duration_ms)}</p>
        <p className='text-s text-sky-100'><span className='text-sky-300'>Release date: </span>{trackDetails.album.release_date}</p>

        {trackDetails.album?.images?.length > 0 && (
          <img 
            className='w-128 md:w-256 lg:w-256 rounded p-4' 
            src={trackDetails.album.images[0].url} 
            alt={trackDetails.name} 
          />
        )}
        <h2 className='text-xl text-sky-100 mt-2'>Artist:</h2>

        {trackDetails.artists.map((artist, index) => (
          <div key={index} className='flex flex-row shadow-lg'>
            <div className="flex basis-5/6 mt-2">
              <p className='text-l text-sky-200 hover:text-sky-100 hover:underline-offset-1'>
              <FontAwesomeIcon className='text-l text-sky-300' icon={faCaretRight} />&emsp;
              <Link to={`/artist/${artist.id}`} onClick={() => window.scrollTo(0, 0)} >{artist.name} - {artist.type}</Link>&emsp;
              </p>
            </div>
            <div className='flex relative justify-center items-center basis-1/6 group'>
              <Link to={`/artist/${artist.id}`} onClick={() => window.scrollTo(0, 0)}>
              <FontAwesomeIcon className='text-l text-sky-100 hover:text-sky-400' icon={faInfoCircle} />
              </Link>
              <div className="absolute bottom-full mb-2 hidden px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:block group-hover:opacity-100 z-10">
              Link to Spotify
              </div>
            </div>
          </div>
        ))}
        <h2 className='text-xl text-sky-100 mt-4'><span className='text-sky-300'>Album: </span>{trackDetails.album.name}</h2>
        <p className='text-l text-sky-100 mb-2'><span className='text-sky-300'>Track: </span>{trackDetails.name}</p>
        <Link to={`/albums/${trackDetails.album.id}`} onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={true} ><FontAwesomeIcon icon={faCircleChevronLeft} />&emsp;Back to full album</MiniButton></Link>

        {trackDetails.preview_url ? (
          <h2 className='text-xl text-sky-100 mt-2 mb-2'>Preview track:</h2>
        ) : (
          <h2 className='text-xl text-sky-100 mt-2 mb-2'>Preview disable</h2>
        )}
          {trackDetails.preview_url && (
            <div className="my-4">
              <audio
                src={trackDetails.preview_url}
                controls
                controlsList="nodownload"
                preload="none"
                className="w-full h-12 rounded-lg shadow-lg"
              >
                Your browser does not support the audio tag.
              </audio>
            </div>
          )}



        <div className='flex flex-row shadow-lg items-center pt-3 pb-3'>
          <div className="flex flex-col basis-3/6 justify-start">
          {trackDetails.artists.map((artist, index) => (
            <Link className='text-sm' key={index} to={`/artist/${artist.id}`} onClick={() => window.scrollTo(0, 0)} >
              <XMiniButton fullWidth={true} >
              <FontAwesomeIcon icon={faStar} />&emsp;{artist.name}
              </XMiniButton>
            </Link>
          ))}
          </div>         
          <div className='flex basis-3/6 justify-end'>
            <Link to={`${trackDetails.external_urls.spotify}`} target="_blank" rel="noopener noreferrer" >
              <CustomButton fullWidth={true} >
                <img className="w-20 md:w-20 lg:w-20" src='/images/logos/Spotify_Logo_RGB_White.png' alt='Listen on Spotify' />
              </CustomButton>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrackDetailsPage;
