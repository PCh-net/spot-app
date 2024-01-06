// pages/HomePage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MiniButton from '../components/MiniButton';



interface CategoryIcon {
  height: number;
  url: string;
  width: number;
}

interface Category {
  id: string;
  name: string;
  icons: CategoryIcon[];
}

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
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

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/browse/categories?limit=20', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const filteredCategories = response.data.categories.items.filter((category: Category) => 
          !['0JQ5DAqbMKFHOzuVTgTizF', '0JQ5DAqbMKFA6SOHvT3gck'].includes(category.id)
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories from Spotify:', error);
      }
    };
    fetchCategories();

  }, [accessToken]);


if (!categories) {
  return <div className='container mx-auto p-4'>
    <h3 className='text-sky-100'>Loading...</h3>
    <img className="h-full md:h-full lg:h-full" src='/images/loader-300.gif' alt='Loader' />
    </div>
}


  return (
    <div>
      <Helmet>
        <title>Home - SpotApp</title>
        <meta name="description" content="New music - Home page." />
        <meta name="keywords" content="SpotApp, PCh"></meta>        
        <meta property="og:title" content="SpotApp - Home page" />
        <meta property="og:description" content="Music from API Spotify." />
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="images/logo_2_rgb_round_1200px_2022.jpg" />
      </Helmet>

      <div className="container mx-auto p-4">
        <h1 className='text-2xl text-sky-100 mb-4'>Spotify Categories</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

        {categories.map((category) => (
        <div key={category.id} className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <Link to={`/categories/${category.id}`} onClick={() => window.scrollTo(0, 0)} >
          <img 
            src={category.icons[0].url} 
            alt={category.name} 
            className="p-4 w-full object-cover rounded"
          />
          </Link>
          <h1 className='text-sky-100 px-4 line-clamp-2 text-ellipsis min-h-[2rem]'>{category.name}</h1>
          <Link to={`/categories/${category.id}`} ><MiniButton fullWidth={true} >Playlist</MiniButton></Link>
        </div>
        ))}

        </div>
      </div>
    </div>
  );
};

export default HomePage;
