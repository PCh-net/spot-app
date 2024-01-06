// pages/ArtistDetailsPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import MiniButton from '../components/MiniButton';

interface Album {
  id: string;
  name: string;
  images: [{ url: string }];
  release_date: string;
  length: string;
  album_type: string;
  album_group: string;
  total_tracks: string;
  // ...
}

interface ArtistDetails {
  id: string;
  name: string;
  images: [{ url: string }];
  genres: string[];
  followers: {total: string;}; 
  popularity: string;
  type: string;
  external_urls: {spotify: string;};
  albums: Album[]; // ...

}

const ArtistDetailsPage = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artistDetails, setArtistDetails] = useState<ArtistDetails | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // baack...
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
    if (!accessToken || !artistId) return;

    const fetchArtistDetails = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setArtistDetails(response.data);

      } catch (error) {
        console.error('Error fetching artist details:', error);
      }
    };

    fetchArtistDetails();

  }, [accessToken, artistId]);

    // ...
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setAlbums(response.data.items); // ...
      } catch (error) {
        console.error('Error fetching artist albums:', error);
      }
    };

    // useEffect...
    useEffect(() => {
      if (!accessToken || !artistId) return;
      fetchAlbums();
      console.log(albums);
    }, [accessToken, artistId]);
    

    if (!artistDetails) {
      return <div className='container mx-auto p-4'>
        <h3 className='text-sky-100'>Loading...</h3>
        <img className="h-full md:h-full lg:h-full" src='/images/loader-300.gif' alt='Loader' />
        </div>
    }




  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded-2xl shadow-md p-4 drop-shadow-xl mt-4">
        <h1 className='text-2xl text-sky-100'><span className='text-sky-300'>Artist: </span>{artistDetails.name}</h1>
        <p className='text-m text-sky-100'><span className='text-sky-300'>Followers: </span>{artistDetails.followers.total}</p>
        <p className='text-m text-sky-100'><span className='text-sky-300'>Popularity: </span>{artistDetails.popularity}</p>
        <p className='text-m text-sky-100'><span className='text-sky-300'>Type: </span>{artistDetails.type}</p>
        {/*   */}
        {artistDetails.images?.length > 0 && (
          <img 
            className='w-128 md:w-256 lg:w-256 rounded p-4' 
            src={artistDetails.images[0].url} 
            alt={artistDetails.name} 
          />
        )}
        <h2 className='text-xl text-sky-100'><span className='text-sky-300'>Albums: </span>{albums.length}</h2>
        {albums.map((album, index) => (
          <div key={index} className='flex flex-row shadow-lg pb-4 pt-4'>
            <div className="flex basis-2/6">
            {artistDetails.images?.length > 0 && (
              <div>
                <Link to={`/albums/${album.id}`} onClick={() => window.scrollTo(0, 0)} >
                  <img 
                    className='object-cover rounded shadow-md' 
                    src={album.images[0].url} 
                    alt={album.name} 
                  />
                </Link>
              </div>
            )}
            </div>         
            <div className='flex-col basis-4/6 p-2'>
              <h2 className='text-lg md:text-4xl text-sky-100'><span className='text-lg md:text-4xl text-sky-300'>Album: </span>{album.name}</h2>
              <p className='text-m md:text-3xl text-sky-100'><span className='text-sky-300'>Release date: </span></p>
              <p className='text-m md:text-4xl text-sky-100'><span>{album.release_date}</span></p>
              <p className='text-m md:text-3xl text-sky-100 mb-2'><span className='text-sky-300'>Total tracks: </span>{album.total_tracks}</p>
              <Link to={`/albums/${album.id}`} onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={true} ><FontAwesomeIcon icon={faCaretRight} />&emsp;More info</MiniButton></Link>
            </div>
        </div>
        ))}
        
        <MiniButton onClick={handleBack} fullWidth={true} ><FontAwesomeIcon icon={faCircleChevronLeft} />&emsp;Back</MiniButton>


        <div className='flex flex-row shadow-lg items-center pt-3 pb-3'>
          <div className="flex basis-3/6 justify-start">
          <Link to="/" >
              <MiniButton fullWidth={true} >
              <FontAwesomeIcon icon={faCircleChevronLeft} />&emsp;Start
              </MiniButton>
            </Link>        
          </div>         
          <div className='flex basis-3/6 justify-end'>
            <Link to={`${artistDetails.external_urls.spotify}`} target="_blank" rel="noopener noreferrer" >
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

export default ArtistDetailsPage;
