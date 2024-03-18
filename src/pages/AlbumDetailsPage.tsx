import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import MiniButton from '../components/MiniButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCaretRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import SeoMetaTags from '../components/SeoMetaTags'; // important!

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
  artists: [{ name: string; id: string }];
  images: [{ url: string }];
  total_tracks: string;
  release_date: string;
  label: string;
  tracks: {
    items: Track[];
  }
}


const AlbumDetailsPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const playingAudioRef = useRef<HTMLAudioElement | null>(null);


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

  }, [albumId, accessToken]);

  const handlePlayAudio = useCallback((audioElement: HTMLAudioElement) => {
    if (playingAudioRef.current && playingAudioRef.current !== audioElement) {
      playingAudioRef.current.pause();
    }
    playingAudioRef.current = audioElement;
  }, []);
  
  if (!albumDetails) {
    return <div className='container mx-auto p-4'>
      <img className="h-full md:h-full lg:h-full" src='/images/loader-300.gif' alt='Loader' />
      </div>
  }

  return (
    <div className="container mx-auto p-4">
      <SeoMetaTags 
        title={`SpotApp | Album: ${albumDetails.name}`}
        description={`Artist: ${albumDetails.artists[0].name}`}
        imageUrl={albumDetails.images[0].url}
        keywords={`album,${albumDetails.label},${albumDetails.artists[0].name}`}
      />
      <div className="flex-row bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded-2xl shadow-md p-4 drop-shadow-xl mt-4">
        <div className='flex flex-col md:flex-row'>
          <div className='flex basis-2/5'>
            {albumDetails.images?.length > 0 && (
              <img 
                className='w-full p-2' 
                src={albumDetails.images[0].url} 
                alt={albumDetails.name} 
              />
            )}
          </div>
          <div className='flex flex-col basis-3/5 ml-2'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl text-sky-100'><span className='text-sky-300'>Album: </span>{albumDetails.name}</h1>
            <p className='text-m md:text-2xl lg:text-2xl text-sky-100'><span className='text-sky-300'>Artist(s): </span>{albumDetails.artists.map(artist => artist.name).join(', ')}</p>
            <p className='text-m md:text-2xl lg:text-2xl text-sky-100'><span className='text-sky-300'>Total tracks: </span>{albumDetails.total_tracks}</p>
            <p className='text-m md:text-2xl lg:text-2xl text-sky-100'><span className='text-sky-300'>Release Date: </span>{albumDetails.release_date}</p>
            <h2 className='text-xl text-sky-100 mt-2'>Artist:</h2>

            {albumDetails.artists.map((artist, index) => (
            <Link className='text-sm' key={index} to={`/artist/${artist.id}`} onClick={() => window.scrollTo(0, 0)} >
              <MiniButton fullWidth={false} size={`text-sm md:text-sm lg:text-lg`} >
              <FontAwesomeIcon icon={faInfoCircle} />&emsp;{artist.name}
              </MiniButton>
            </Link>
          ))}
          </div>
        </div>
        <div className='p-2 shadow-lg'>
          <h2 className='text-xl md:text-2xl lg:text-3xl text-sky-200'>Tracks:</h2>
        </div>
      
      {albumDetails.tracks.items.length > 0 && (
      albumDetails.tracks.items.map((track, index) => (
        <React.Fragment key={index}>
          <div className='flex flex-col shadow-lg'>
            <div className='mt-4'>
                <p className='text-l md:text-xl lg:text-2xl text-sky-100 hover:text-sky-200'>
                <span>{track.track_number} <FontAwesomeIcon className='text-l text-sky-100' icon={faCaretRight} /> <Link to={`/track/${track.id}`} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}>{track.name}</Link>
              </span></p>
            </div>
              
            <div className='flex flex-col'>
            {track.preview_url && (
              <p className='text-m md:text-xl lg:text-xl text-sky-100'>Preview:&emsp;</p>
            )}

            {track.preview_url ? (
              <div className="my-2">
                <audio
                  src={track.preview_url}
                  controls
                  controlsList="nodownload"
                  preload="none"
                  className="w-full h-8 md:h-8 lg:h-10 rounded-lg shadow-lg"
                  onPlay={(emit) => handlePlayAudio(emit.currentTarget)}
                >
                  Your browser does not support the audio.
                </audio>
              </div>
            ) : (
              <p className='text-l md:text-2xl lg:text-2xl text-sky-300'>Preview - disable</p>
            )}

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