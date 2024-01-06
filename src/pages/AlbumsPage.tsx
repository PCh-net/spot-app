// pages/AlbumPages.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCaretRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../components/CustomButton';
import MiniButton from '../components/MiniButton';
import PaginationButton from '../components/PaginationButton';

interface Album {
  id: string;
  name: string;
  release_date: string;
  total_tracks: string;
  type: string;
  album_type: string;
  images: [{ url: string }];
  artists:  [{ 
    id: string
    name: string
    type: string
  }];

}

const AlbumsPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [albumsPerPage] = useState(12); // Liczba albumów na stronę
  const [totalAlbums, setTotalAlbums] = useState(0); // Łączna liczba albumów
  const [countryCode, setCountryCode] = useState('GB');

  // Funkcja konwersji kodu kraju na nazwę
  const convertCountryCodeToName = (code: string) => {
    const countryNames: { [key: string]: string } = {
      US: 'United States',
      GB: 'Great Britain',
      JP: 'Japan',
      PL: 'Poland',
      FR: 'France',
      DE: 'Germany',
      AU: 'Australia',
      SE: 'Sweden'
    };

    return countryNames[code] || code;
  };

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
  
    const fetchAlbums = async () => {
      try {
        const offset = currentPage * albumsPerPage;
        const response = await axios.get(`https://api.spotify.com/v1/browse/new-releases?country=${countryCode}&offset=${offset}&limit=${albumsPerPage}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setAlbums(response.data.albums.items);
        setTotalAlbums(response.data.albums.total); // Ustawienie całkowitej liczby albumów
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
 
    fetchAlbums();

  }, [accessToken, currentPage, albumsPerPage, countryCode]); 
  
  
  const lastPage = Math.ceil(totalAlbums / albumsPerPage) - 1;

const handlePrevious = () => {
  if (currentPage > 0) setCurrentPage(currentPage - 1);
  window.scrollTo(0, 0);
};

const handleNext = () => {
  if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  window.scrollTo(0, 0);
};



if (!albums) {
  return <div className='container mx-auto p-4'>
    <h3 className='text-sky-100'>Loading...</h3>
    <img className="h-full md:h-full lg:h-full" src='/images/loader-300.gif' alt='Loader' />
    </div>
}

  return (
    
    <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-2xl lg:text-4xl text-sky-100 mb-4">New Releases</h1>
      <div className="flex justify-center mt-1">
        <MiniButton onClick={() => setCountryCode('US')}><img src="/images/flags/icons8-usa-48.png" className="w-10" alt='flag-usa' /></MiniButton>
        <MiniButton onClick={() => setCountryCode('GB')}><img src="/images/flags/icons8-great-britain-48.png" className="w-10" alt='flag-great-britan' /></MiniButton>
        <MiniButton onClick={() => setCountryCode('JP')}><img src="/images/flags/icons8-japan-48.png" className="w-10" alt='flag-japan' /></MiniButton>
        <MiniButton onClick={() => setCountryCode('PL')}><img src="/images/flags/icons8-poland-48.png" className="w-10" alt='flag-poland' /></MiniButton>
      </div>
      <div className="flex justify-center mt-1">
        <MiniButton onClick={() => setCountryCode('FR')}><img src="/images/flags/icons8-france-48.png" className="w-10" alt='flag-france' /></MiniButton>
        <MiniButton onClick={() => setCountryCode('DE')}><img src="/images/flags/icons8-germany-48.png" className="w-10" alt='flag-germany' /></MiniButton>
        <MiniButton onClick={() => setCountryCode('AU')}><img src="/images/flags/icons8-australia-48.png" className="w-10" alt='flag-japan' /></MiniButton>
        <MiniButton onClick={() => setCountryCode('SE')}><img src="/images/flags/icons8-sweden-48.png" className="w-10" alt='flag-poland' /></MiniButton>
      </div>
      <div className="flex justify-center mt-4">
        <h3 className="text-xl md:text-2xl lg:text-4xl text-sky-100 mb-4">{convertCountryCodeToName(countryCode)}</h3>
      </div>
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
      {!albums.length ? (
        <div className="text-center">
          <img src='/images/loader-300.gif' alt='Loading...' />
          <p>Loading...</p>
        </div>
        ) : (
        albums.map(album => (
          <div key={album.id} className="flex flex-col justify-between bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded-2xl p-4 drop-shadow-xl mt-4">
            <div>
              {album.images.length > 0 && (
                <Link to={`/albums/${album.id}`} >
                  <img src={album.images[0].url} alt={album.name} className="w-full object-cover rounded p-2 shadow-md" />
                </Link>
              )}
            </div>
            <div>
              <h2 className='text-xl text-sky-100'><span className='text-sky-300'>Album: </span>{album.name}</h2>
              <p className='text-s text-sky-200 mt-0.5'>Artist(s):</p>

              {album.artists.map((artist, index) => (
                <span key={artist.id} className='text-sm no-underline hover:underline text-sky-100'>
                  <FontAwesomeIcon className='text-l text-sky-100 hover:text-sky-400' icon={faInfoCircle} /> <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                  {index < album.artists.length - 1 ? ', ' : ''}
                </span>
              ))}

              <p className='text-s text-sky-200 mt-0.5'><span className='text-sky-300'>Total tracks: </span>{album.total_tracks} / ({album.album_type})</p>
              <p className='text-s text-sky-200 mt-0.5'><span className='text-sky-300'>Relase date: </span>{album.release_date}</p>
            </div>
            <div className='flex flex-row justify-center mt-2'>
              <div className='flex basis-4/6 items-center mt-2'>
                <Link to={`/albums/${album.id}`} onClick={() => window.scrollTo(0, 0)}><MiniButton><FontAwesomeIcon icon={faCaretRight} />&emsp;Full album</MiniButton></Link>
              </div>
              <div className='flex basis-2/6 justify-center items-center'>
              <Link to={`/albums/${album.id}`} onClick={() => window.scrollTo(0, 0)}><img className="h-6 md:h-6 lg:h-6 hover:h-7" src='/images/logos/Spotify_Logo_RGB_White.png' alt='Logo' /></Link>
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

      <h1 className="text-2xl text-sky-100 mb-4">New Releases: {convertCountryCodeToName(countryCode)}</h1>

      <div className="flex justify-center mt-1">
        <MiniButton onClick={() => {
          setCountryCode('US');
          window.scrollTo(0, 0);
        }}>
          <img src="/images/flags/icons8-usa-48.png" className="w-10" alt='flag-usa' />
        </MiniButton>
        <MiniButton onClick={() => {
          setCountryCode('GB');
          window.scrollTo(0, 0);
        }}>
          <img src="/images/flags/icons8-great-britain-48.png" className="w-10" alt='flag-great-britan' />
        </MiniButton>
        <MiniButton onClick={() => {
          setCountryCode('JP');
          window.scrollTo(0, 0);
        }}>
          <img src="/images/flags/icons8-japan-48.png" className="w-10" alt='flag-japan' />
        </MiniButton>
        <MiniButton onClick={() => {
          setCountryCode('PL');
          window.scrollTo(0, 0);
        }}>
          <img src="/images/flags/icons8-poland-48.png" className="w-10" alt='flag-poland' />
        </MiniButton>
      </div>
      <div className="flex justify-center mt-1">
        <MiniButton onClick={() => {
          setCountryCode('FR');
          window.scrollTo(0, 0);
        }}>
          <img src="/images/flags/icons8-france-48.png" className="w-10" alt='flag-france' />
        </MiniButton>
        <MiniButton onClick={() => {
          setCountryCode('DE');
          window.scrollTo(0, 0);
        }}>
          <img src="/images/flags/icons8-germany-48.png" className="w-10" alt='flag-germany' />
        </MiniButton>
        <MiniButton onClick={() => {
          setCountryCode('AU');
          window.scrollTo(0, 0);
        }}>
          <img src="/images/flags/icons8-australia-48.png" className="w-10" alt='flag-australia' />
        </MiniButton>
        <MiniButton onClick={() => {
          setCountryCode('SE');
          window.scrollTo(0, 0);
        }}>
          <img src="/images/flags/icons8-sweden-48.png" className="w-10" alt='flag-sweden' />
        </MiniButton>
      </div>

      <Link to="/">
        <CustomButton size="text-2xl" fullWidth={true}>Home page</CustomButton>
      </Link>
    </div>
  );
};

export default AlbumsPage;
