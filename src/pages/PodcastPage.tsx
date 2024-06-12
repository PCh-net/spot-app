import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../components/CustomButton';
import MiniButton from '../components/MiniButton';
import PaginationButton from '../components/PaginationButton';
import SeoMetaTags from '../components/SeoMetaTags'; // important!
import { podcastCategory } from '../constants/padcastCategory';


interface Podcast {
  id: string;
  name: string;
  description: string;
  total_episodes: string;
  type: string;
  album_type: string;
  images: [{ url: string }];
  publisher: string;
  external_urls: ExternalUrls;
}

interface ExternalUrls {
  spotify: string;
}


const PodcastPage = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const { podcastName } = useParams<{ podcastName: string }>();
  const [currentPage, setCurrentPage] = useState(0);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [podcastsPerPage] = useState(12);
  const [totalPodcasts, setTotalPodcasts] = useState(0);


  const getAccessToken = async () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
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
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (!accessToken) return;
  
    const fetchPodcasts = async () => {
      try {
        const offset = currentPage * podcastsPerPage;

        let queryName = podcastName || "technology";

        const response = await axios.get(`https://api.spotify.com/v1/search?q=${queryName}&type=show&limit=${podcastsPerPage}&offset=${offset}&market=PL`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        setPodcasts(response.data.shows.items);
        setTotalPodcasts(response.data.shows.total);

      } catch (error) {
        console.error('Error fetching podcast:', error);
      }
    };
 
    fetchPodcasts();

  }, [accessToken, currentPage, podcastsPerPage, podcastName]); 



  const lastPage = Math.ceil(totalPodcasts / podcastsPerPage) - 1;

const handlePrevious = () => {
  if (currentPage > 0) setCurrentPage(currentPage - 1);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleNext = () => {
  if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleCategory = () => {
  setCurrentPage(0);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

if (!podcasts) {
  return <div className='container mx-auto p-4'>
    <img className="h-full md:h-full lg:h-full" src='/images/loader-300.gif' alt='Loader' />
    </div>
}
console.log(podcasts);
  return (
    <div className="container mx-auto p-4">
      <SeoMetaTags 
        title={`SpotApp | Podcast`}
        description='Dive into the world of podcasts with our app, where the latest albums across all genres await you. Powered by Spotify comprehensive library, find your next favorite album and expand your musical horizons. New music is podcast at your fingertips!'
        imageUrl={podcasts[0]?.images[0].url}
        keywords='podcasts,spotify'
      />
      <h1 className="text-2xl md:text-2xl lg:text-4xl text-sky-100 mb-4">New Podcasts: {podcastName}</h1>

      <div className="flex text-xl justify-center mt-4 align-middle">
        <PaginationButton onClick={handlePrevious} disabled={currentPage === 0}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </PaginationButton>
        <span className="mx-2 mt-1 align-middle text-sky-200">Page {currentPage + 1} / {lastPage + 1}</span>
        <PaginationButton onClick={handleNext} disabled={currentPage === lastPage}>
          <FontAwesomeIcon icon={faArrowRight} />
        </PaginationButton>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {!podcasts.length ? (
        <div className="text-center">
          <img src='/images/loader-300.gif' alt='Loading...' />
        </div>
        ) : (
          podcasts.map(podcast => (
          <div key={podcast.id} className="flex flex-col justify-between bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded-2xl p-4 drop-shadow-xl mt-4">
            <div>
              {podcast.images.length > 0 && (
                <Link to={`/podcast/${podcast.id}`} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} >
                  <img src={podcast.images[0].url} alt={podcast.name} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} className="w-full object-cover rounded shadow-md hover:shadow-xl hover:shadow-sky-400/70 transform hover:scale-95 transition-transform duration-200" />
                </Link>
              )}
            </div>
            <div>
              <h2 className='text-xl text-sky-100 pt-2 line-clamp-3 text-ellipsis min-h-[3rem]'><span className='text-sky-300'>Podcast: </span>{podcast.name}</h2>
              <p className='text-s text-sky-200 mt-0.5'>Publisher: {podcast.publisher}</p>
              <p className='text-s text-sky-200 mt-0.5'>Total episodes: {podcast.total_episodes}</p>
            </div>
            <div className='flex flex-row justify-center mt-2'>
              <div className='flex basis-4/6 items-center mt-2'>
                <Link to={`/podcast/${podcast.id}`} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}><MiniButton><FontAwesomeIcon icon={faCaretRight} />&emsp;Podcast</MiniButton></Link>
              </div>
              <div className='flex basis-2/6 justify-center items-center'>
              <Link to={podcast.external_urls.spotify} target="_blank" rel="noopener noreferrer" ><img className="h-6 md:h-6 lg:h-6 hover:h-7 transition-transform duration-600 ease-in-out" src='/images/logos/Spotify_Logo_RGB_White.png' alt='Logo' title="Listen on Spotify" /></Link>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
      
      <div className="flex text-l justify-center mt-4 align-middle">
        <PaginationButton onClick={handlePrevious} disabled={currentPage === 0}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </PaginationButton>
        <span className="mx-2 mt-1 align-middle text-sky-200">Page {currentPage + 1} / {lastPage + 1}</span>
        <PaginationButton onClick={handleNext} disabled={currentPage === lastPage}>
          <FontAwesomeIcon icon={faArrowRight} />
        </PaginationButton>
      </div>

      <h1 className="text-2xl md:text-2xl lg:text-4xl text-sky-100 mb-4">Podcast categories:</h1>

      <div className="gap-4">
        <div className='py-1'>
          {podcastCategory.map((category, index) => (
            <Link key={index} to={category.path} onClick={handleCategory} >
              <MiniButton size="text-sm" fullWidth={false}>
              {category.label}
              </MiniButton>
            </Link>
          ))}
        </div>
      </div>


      <Link to="/" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}>
        <CustomButton size="text-2xl" fullWidth={true}>Home page</CustomButton>
      </Link>

    </div>
  );
};

export default PodcastPage;
