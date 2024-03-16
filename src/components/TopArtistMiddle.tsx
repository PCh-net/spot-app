import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MiniButton from '../components/MiniButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface Artist {
  id: string;
  name: string;
  images: [{ 
    url: string
  }];
  followers: {
    total: number;
  };
  trackIds: string;
  imgAdd: string;
  describe: string;
  albumId: string;
  title: string;
}

const TopArtistMiddle = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  const getAccessToken = async () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
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
    const fetchArtists = async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) return;


      const artistsDataWithTrackIds = [
        { 
          id: '0YC192cP3KPCRWx8zr8MfZ', 
          trackIds: 'https://p.scdn.co/mp3-preview/f2dbddb2793248b109a1dff8c969d88dc805c67b?cid=2d48febd4152491a883609feb042f577', 
          imgAdd: 'https://i.scdn.co/image/ab67616d0000b273166adc280da684b1d54f4126',
          describe: 'Album: Dune: Part Two (Original Motion Picture Soundtrack)',
          albumId: '1PeYjDmxcRNvxLd5mGHuCC',
          title: 'Spice'
        },
        { 
          id: '3IpQziA6YwD53PQ5xbwgLF', 
          trackIds: 'https://p.scdn.co/mp3-preview/8d123f355d30caf8c11fcb4569a95b9778bdc68c?cid=2d48febd4152491a883609feb042f577', 
          imgAdd: 'https://i.scdn.co/image/ab67616d0000b27335f29c49f7e47f24df12eeb9',
          describe: 'Album: The Theory of Everything (Original Motion Picture Soundtrack)',
          albumId: '02VRifrsiTM73hPGjXduRQ',
          title: 'Cambridge, 1963'
        },
        { 
          id: '1nIUhcKHnK6iyumRyoV68C', 
          trackIds: 'https://p.scdn.co/mp3-preview/662406d752337421852e3c8c478e9fa8ba8dae06?cid=2d48febd4152491a883609feb042f577', 
          imgAdd: 'https://i.scdn.co/image/ab67616d0000b273b06bdf67fdd9a7b5e581f1da',
          describe: 'Album: Passione - 50 Romantic Music Pieces',
          albumId: '3gs8XXJemYVZYIARlSTCoe',
          title:  'Attimi dAmore'
        },
        { 
          id: '6McH9ZlRL24gW6Bt4fpqad', 
          trackIds: 'https://p.scdn.co/mp3-preview/73b30670d44718c8fc31c32a77e25354b27de363?cid=2d48febd4152491a883609feb042f577', 
          imgAdd: 'https://i.scdn.co/image/ab67616d0000b27346d4af46cef0c68db25b3f0a',
          describe: 'Album: Kilar: Bram Stokers Dracula / Death and the Maiden',
          albumId: '2N7dhz96a4GrM51M1ErnWK',
          title: 'Bram Stokers Dracula: The Brides'
        },
      ];

      const artistsData = await Promise.all(
        artistsDataWithTrackIds.map(async (artistData) => {
          const response = await axios.get(`https://api.spotify.com/v1/artists/${artistData.id}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
          });

          return { ...response.data, trackIds: artistData.trackIds, imgAdd: artistData.imgAdd, describe: artistData.describe, albumId: artistData.albumId, title: artistData.title };
        })
      );
      setArtists(artistsData);
    };

    fetchArtists();
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h1 className='text-2xl text-sky-100 mb-4'>Top Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {artists.map((artist) => (
          <div key={artist.id} className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
            <div className='flex flex-row mt-2'>
              <div className='flex basis-5/6 justify-start'>
                <span className='text-sm md:text-md lg:text-lg text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
                  <FontAwesomeIcon icon={faCircleInfo} />&emsp;
                  <Link to={`/artist/${artist.id}`} onClick={() => window.scrollTo(0, 0)} >Artist info</Link>
                </span>
              </div>
              <div className='flex basis-1/6 justify-end'>
                <img className="h-6 md:h-4 lg:h-4 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
              </div>
            </div>

            <div className='flex flex-row justify-center mt-2'>
              <div className='flex basis-2/6'>
                <img 
                  src={artist.images[0].url}
                  alt={artist.name} 
                  className="p-2 w-full object-cover rounded"
                />
              </div>
              <div className='flex flex-col basis-4/6 p-2'>
                <h3 className='text-lg md:text-lg lg:text-2xl text-sky-200 line-clamp-1 text-ellipsis min-h-[1rem]'>
                {artist.name}
                </h3>
                <p className='text-sm text-sky-100 pb-2'><span className='text-sm text-sky-200'>Followers: </span>{artist.followers.total}</p>
                <Link to={`/artist/${artist.id}`} onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={false} size={`text-sm md:text-sm lg:text-lg`} >Artist</MiniButton></Link>
              </div>
            </div>
            <div className='p-2'>
              <h3 className='text-md md:text-md lg:text-xl text-sky-100'>{artist.describe}</h3>
              <p className='text-md md:text-md lg:text-lg text-sky-200'>Title: {artist.title}</p>
            </div>
            <div className='p-2'>
            <audio
                src={artist.trackIds}
                controls
                controlsList="nodownload"
                preload="none"
                className="w-full h-8 md:h-8 lg:h-10 rounded-lg shadow-lg"
              >
                Your browser does not support the audio.
              </audio>
            </div>
            <div className='p-2'>
              <Link to={`/albums/${artist.albumId}`} onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={true} size={`text-sm md:text-sm lg:text-lg`} >Full album</MiniButton></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtistMiddle;
