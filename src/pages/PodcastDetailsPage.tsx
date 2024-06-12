import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import XMiniButton from '../components/XMiniButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import SeoMetaTags from '../components/SeoMetaTags'; // important!

interface Episodes {
  id: string;
  name: string;
  duration_ms: number;
  audio_preview_url: string;
  track_number: string;
  description: string;
  external_urls: {
    spotify: string;
  };
  images: [{ url: string }];
}

interface PodcastDetails {
  id: string;
  name: string;
  publisher: string;
  images: [{ url: string }];
  total_episodes: string;
  release_date: string;
  label: string;
  episodes: {
    items: Episodes[];
  }
}


const PodcastDetailsPage = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const [podcastDetails, setPodcastDetails] = useState<PodcastDetails | null>(null);
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
    if (!accessToken || !podcastId) return;

    const fetchPodcastDetails = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/shows/${podcastId}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        setPodcastDetails(response.data);
      } catch (error) {
        console.error('Error fetching album details:', error);
      }
    };

    fetchPodcastDetails();

  }, [podcastId, accessToken]);



  const handlePlayAudio = useCallback((audioElement: HTMLAudioElement) => {
    if (playingAudioRef.current && playingAudioRef.current !== audioElement) {
      playingAudioRef.current.pause();
    }
    playingAudioRef.current = audioElement;
  }, []);
  
  if (!podcastDetails) {
    return <div className='container mx-auto p-4'>
      <img className="h-full md:h-full lg:h-full" src='/images/loader-300.gif' alt='Loader' />
      </div>
  }

  return (
    <div className="container mx-auto p-4">
      <SeoMetaTags 
        title={`SpotApp | Podcast: ${podcastDetails.name}`}
        description={`Publisher: ${podcastDetails.publisher}`}
        imageUrl={podcastDetails.images[0].url}
      />
      <div className="flex-row bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded-2xl shadow-md p-4 drop-shadow-xl mt-4">
        <div className='flex flex-col md:flex-row'>
          <div className='basis-2/5'>
            {podcastDetails.images?.length > 0 && (
              <img 
                className='w-full p-2' 
                src={podcastDetails.images[0].url} 
                alt={podcastDetails.name} 
              />
            )}
          </div>
          <div className='basis-3/5 ml-2'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl text-sky-100'><span className='text-sky-300'>Podcast: </span>{podcastDetails.name}</h1>
            <p className='text-base text-sky-100 mt-2'>{podcastDetails.episodes.items[0].description}</p>            
            <p className='text-m md:text-2xl lg:text-2xl text-sky-100'><span className='text-sky-300'>Total episodes: </span>{podcastDetails.total_episodes}</p>
            <p className='text-xl text-sky-100 mt-2'>Publisher: {podcastDetails.publisher}</p>
          </div>
        </div>
        <div className='p-2 shadow-lg'>
          <h2 className='text-xl md:text-2xl lg:text-3xl text-sky-200'>Tracks:</h2>
        </div>
      
      {podcastDetails.episodes.items.length > 0 && (
      podcastDetails.episodes.items.map((episode, index) => (
        <React.Fragment key={index}>
          <div className='flex flex-col shadow-lg'>
            <div className='flex flex-row md:flex-row'>
              <div className='w-1/4 md:w-4/4'>
                <img className='p-2 w-full' src={podcastDetails.episodes.items[index].images[0].url} alt={episode.name} />
              </div>
              <div className='w-3/4 md:w-4/4 m-4'>
                <p className='text-xl md:text-xl lg:text-2xl text-sky-300'>
                {episode.track_number} <FontAwesomeIcon className='text-l text-sky-200 mr-2' icon={faCaretRight} /> {episode.name}
                </p>
                <p className='text-sm md:text-sm lg:text-xl text-sky-100'>{podcastDetails.episodes.items[index].description}</p>
              </div>
            </div>
              
            <div className='flex flex-col'>
            {episode.audio_preview_url ? (
              <div className="flex flex-row justify-center my-4">
                <div className='flex w-3/4 items-center'>
                  <audio
                    src={episode.audio_preview_url}
                    controls
                    controlsList="nodownload"
                    preload="none"
                    className="w-full h-8 md:h-8 lg:h-10 rounded-lg shadow-lg"
                    onPlay={(emit) => handlePlayAudio(emit.currentTarget)}
                  >
                    Your browser does not support the audio.
                  </audio>
                </div>
                <div className='flex w-1/4 justify-center items-center'>
                  <Link to={episode.external_urls.spotify} target="_blank" rel="noopener noreferrer" ><img className="h-4 md:h-5 lg:h-6 transition-transform duration-600 ease-in-out" src='/images/logos/Spotify_Logo_RGB_White.png' alt='Logo' title="Listen on Spotify" /></Link>
                </div>
              </div>
            ) : (
              <div className='flex flex-row md:flex-row lg:flex-row items-center pt-3 pb-3'>
                <div className="flex flex-col basis-4/6 justify-start">
                  <p className='text-xs md:text-sm lg:text-sm text-sky-200'>Preview unavailable, listen on Spotify</p>
                </div>         
              <div className='flex basis-2/6 justify-end'>
                <Link to={episode.external_urls.spotify} target="_blank" rel="noopener noreferrer" >
                  <XMiniButton fullWidth={true} >
                    <img className="h-4 md:h-5 lg:h-5" src='/images/logos/Spotify_Logo_RGB_White.png' alt='Listen on Spotify' />
                  </XMiniButton>
                </Link>
              </div>
            </div>
            )}

            </div>
          </div>
        </React.Fragment>
      ))
    )}


        <CustomButton onClick={() => { window.history.back(); window.scrollTo({ top: 0, behavior: "smooth" }); }} fullWidth={true} size='text-xl md:text-2xl' >
          <FontAwesomeIcon icon={faCircleChevronLeft} />&emsp;Back to list
        </CustomButton>

      </div>
    </div>
  );
};

export default PodcastDetailsPage;