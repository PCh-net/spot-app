// pages/CategoriesPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import XMiniButton from '../components/XMiniButton';
import SeoMetaTags from '../components/SeoMetaTags'; // important!


interface Playlist {
  id: string;
  name: string;
  images: [{ url: string }];
  description: string;
  external_urls: {
    spotify: string;
  };
  tracks: {
    total: string;
  };
}

interface CategoryDetails {
  id: string;
  name: string;
  href: string;
  icons: [{ url: string }];
}

const CategoriesPage = () => {
  const { id } = useParams<{ id: string }>();
  const [categoryDetails, setCategoryDetails] = useState<CategoryDetails | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    const fetchCategoryDetails = async () => {
      if (!accessToken || !id) return;
    
      try {
        const response = await axios.get(`https://api.spotify.com/v1/browse/categories/${id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setCategoryDetails(response.data);
      } catch (error) {
        console.error('Error fetching category details:', error);
        setError('The category details failed to load.');
      }
    };

    const fetchCategoryPlaylists = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=30`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setPlaylists(response.data.playlists.items);
      } catch (error) {
        setError('Failed to load data.');
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) {
      fetchCategoryDetails();
      fetchCategoryPlaylists();
    }

  }, [id, accessToken]);

  if (!categoryDetails) {
    return <div className='container mx-auto p-4'>
      <img className="h-full md:h-full lg:h-full" src='/images/loader-300.gif' alt='Loader' />
      </div>
  }
  
  return (
    <div className="container mx-auto p-4">
      <SeoMetaTags 
        title={`SpotApp | Categories`}
        description={`Category playlist: ${categoryDetails?.name}`}
        imageUrl={categoryDetails.icons[0].url}
        keywords={`playlist,${categoryDetails?.name}`}
      />
      <h1 className="text-2xl text-sky-200 mb-4">Category Details: {categoryDetails?.name}</h1>
      {categoryDetails && categoryDetails.icons && categoryDetails.icons.length > 0 && (
        <img src={categoryDetails.icons[0].url} alt={categoryDetails.name} className="w-full h-full mb-4 md:hidden lg:hidden" />
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {isLoading ? (
          <p className="text-l text-sky-200"></p>
        ) : error ? (
          <p className="text-l text-red-500">{error}</p>
        ) : playlists.length > 0 ? (
          playlists.map((playlist, index) => (
            playlist && ( 
              <div key={index} className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
                <div className='flex flex-row justify-center mt-2'>
                  <div className='flex basis-5/6 items-center'>
                    <span className='text-sm md:text-xs lg:text-sm text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
                    <FontAwesomeIcon icon={faStar} />&nbsp;
                    <Link to={`/playlist/${playlist.id}`} onClick={() => window.scrollTo(0, 0)} >Playlist</Link>
                    </span>
                  </div>
                  <div className='flex basis-1/6 justify-center items-center'>
                  <img className="h-6 md:h-4 lg:h-4 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
                  </div>
                </div>
                {playlist.images.length > 0 && (
                  <Link to={`/playlist/${playlist.id}`}><img 
                  src={playlist.images[0]?.url || '/images/logos/Spotify_Icon_RGB_White.png'} 
                  onError={(e) => e.currentTarget.src = '/images/logos/Spotify_Icon_RGB_White.png'}
                  alt={playlist.name}
                  className='p-2 w-full object-cover rounded'
                  onClick={() => window.scrollTo(0, 0)}
                  />
                  </Link>
                )}

                <div className='flex flex-col ml-2'>
                  <span className='text-l md:l lg:sl text-sky-100 hover:text-sky-200 line-clamp-2 text-ellipsis min-h-[2rem]'><Link  to={`/playlist/${playlist.id}`} onClick={() => window.scrollTo(0, 0)}>{playlist.name}</Link></span>
                  <p className='text-xs md:xs lg:sm text-sky-200'>Tracks: {playlist.tracks.total}</p>
                  <span className='text-xs md:xs lg:sm text-sky-200 line-clamp-3 text-ellipsis min-h-[3rem]'>{playlist.description}</span>
                  <div className='py-2'>
                  <Link to={`/playlist/${playlist.id}`} onClick={() => window.scrollTo(0, 0)} className='text-xs text-sky-500'>
                    <XMiniButton fullWidth={false}>
                    <FontAwesomeIcon icon={faCaretRight} /> Full playlist
                    </XMiniButton>
                  </Link>
                  </div>
                </div>

              </div>
            )
          ))
        ) : (
          <div className="text-center">
            <p className="text-l text-sky-200">No playlist...</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default CategoriesPage;
