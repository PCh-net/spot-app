import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faCaretRight, faInfoCircle, faPodcast } from '@fortawesome/free-solid-svg-icons';
import MiniButton from '../components/MiniButton';
import SeoMetaTags from '../components/SeoMetaTags'; // important!
import { podcastHomePage } from '../constants/podcastHomePage';

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


const AlbumsPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const playingAudioRef = useRef<HTMLAudioElement | null>(null);

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

      const albumsEndpoint = `https://api.spotify.com/v1/albums?ids=3AMXFnwHWXCvNr5NCCpLZI,1PeYjDmxcRNvxLd5mGHuCC,04rz93AqGy9JduzV3K81Dh,4iLPd0Abb4S96sB2QEz2bl,4bNiBmPncdmzzWdeUSs7DF,1TWi6eUlS9z7ORpStTeBV8,3vWAnIoZc46DUofbCjySZK,6PRPYATK5VvjZ2p911y6U0,02VRifrsiTM73hPGjXduRQ,0LbBu7ge5bkDeI17ozc174,0rwbMKjNkp4ehQTwf9V2Jk,3gz3XOFJ5w99GDode87xbO`;

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


      try {
        const [albumsResponse] = await Promise.all([
          axios.get(albumsEndpoint, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
          }),
        ]);

        const artistsData = await Promise.all(
          artistsDataWithTrackIds.map(async (artistData) => {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${artistData.id}`, {
              headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            return { ...response.data, trackIds: artistData.trackIds, imgAdd: artistData.imgAdd, describe: artistData.describe, albumId: artistData.albumId, title: artistData.title };
          })
        );

        setAlbums(albumsResponse.data.albums);
        setArtists(artistsData);

      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();

  }, [accessToken]); 

  const handlePlayAudio = useCallback((audioElement: HTMLAudioElement) => {
    if (playingAudioRef.current && playingAudioRef.current !== audioElement) {
      playingAudioRef.current.pause();
    }
    playingAudioRef.current = audioElement;
  }, []);


if (!albums) {
  return <div className='container mx-auto p-4'>
    <img className="h-full md:h-full lg:h-full" src='/images/loader-300.gif' alt='Loader' />
    </div>
}

  return (
    <div className="container mx-auto p-4">
      <SeoMetaTags 
        title={`SpotApp | Home Page`}
        description='Discover new hits and explore the vast world of music with our app, powered by Spotify extensive music library.'
        imageUrl='/images/logo_2_rgb_round_1200px_2022.jpg'
        keywords='PCh,API,Spotify'
      />
      <h1 className="text-2xl md:text-2xl lg:text-4xl text-sky-100 mb-4">Albums</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {!albums.length ? (
        <div className="text-center">
          <img src='/images/loader-300.gif' alt='Loading...' />
        </div>
        ) : (
        albums.map(album => (
          <div key={album.id} className="flex flex-col justify-between bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded-2xl p-4 drop-shadow-xl mt-4">
            <div>
              {album.images.length > 0 && (
                <Link to={`/albums/${album.id}`} >
                  <img src={album.images[0].url} alt={album.name} className="w-full object-cover rounded shadow-md hover:shadow-xl hover:shadow-sky-400/70 transform hover:scale-95 transition-transform duration-200" />
                </Link>
              )}
            </div>
            <div>
              <h2 className='text-xl text-sky-100 pt-2'><span className='text-sky-300'>Album: </span>{album.name}</h2>
              <p className='text-s text-sky-200 mt-0.5'>Artist(s):</p>

              {album.artists.map((artist, index) => (
                <span key={artist.id} className='text-sm text-sky-100'>
                  <FontAwesomeIcon className='text-l text-sky-100 hover:text-sky-400' icon={faInfoCircle} /> <Link to={`/artist/${artist.id}`} className=' no-underline hover:underline'>{artist.name}</Link>
                  {index < album.artists.length - 1 ? ', ' : ''}
                </span>
              ))}

              <p className='text-s text-sky-200 mt-0.5'><span className='text-sky-300'>Total tracks: </span>{album.total_tracks} / ({album.album_type})</p>
              <p className='text-s text-sky-200 mt-0.5'><span className='text-sky-300'>Relase date: </span>{album.release_date}</p>
            </div>
            <div className='flex flex-row justify-center mt-2'>
              <div className='flex basis-4/6 items-center mt-2'>
                <Link to={`/albums/${album.id}`} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}><MiniButton><FontAwesomeIcon icon={faCaretRight} />&emsp;Full album</MiniButton></Link>
              </div>
              <div className='flex basis-2/6 justify-center items-center'>
              <Link to={`/albums/${album.id}`} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}><img className="h-6 md:h-6 lg:h-6 hover:h-7" src='/images/logos/Spotify_Logo_RGB_White.png' alt='Logo' /></Link>
              </div>
            </div>
          </div>

          ))
        )}
      </div>

      <h1 className='text-2xl md:text-2xl lg:text-4xl text-sky-100 py-4'>Top Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {artists.map((artist) => (
          <div key={artist.id} className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded-2xl shadow-md hover:shadow-xl items-center p-2">
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
                  className="p-2 w-full object-cover rounded-full"
                />
              </div>
              <div className='flex flex-col basis-4/6 p-2'>
                <h3 className='text-lg md:text-lg lg:text-2xl text-sky-200 line-clamp-2 text-ellipsis min-h-[2rem]'>
                {artist.name}
                </h3>
                <p className='text-sm text-sky-100 pb-2'><span className='text-sm text-sky-200'>Followers: </span>{artist.followers.total}</p>
                <Link to={`/artist/${artist.id}`} onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={false} size={`text-sm md:text-sm lg:text-lg`} >Artist</MiniButton></Link>
              </div>
            </div>
            <div className='p-2'>
              <h3 className='text-md md:text-md lg:text-xl text-sky-100 line-clamp-2 text-ellipsis min-h-[2rem]'>{artist.describe}</h3>
              <p className='text-md md:text-md lg:text-lg text-sky-200'>Title: {artist.title}</p>
            </div>
            <div className='p-2'>
            <audio
                src={artist.trackIds}
                controls
                controlsList="nodownload"
                preload="none"
                className="w-full h-8 md:h-8 lg:h-10 rounded-lg shadow-lg"
                onPlay={(emit) => handlePlayAudio(emit.currentTarget)}
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

      <h1 className='text-2xl md:text-2xl lg:text-4xl text-sky-100 py-4'>Podcasts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {podcastHomePage.map((podcastHome, index) => (
        <div key={podcastHome.id} className="flex flex-col justify-between bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded-2xl p-4 drop-shadow-xl mt-4">
          <div className='flex flex-row mb-2'>
            <div className='flex basis-5/6 justify-start'>
              <span className='text-sm md:text-sm lg:text-sm text-sky-100 hover:text-sky-200 line-clamp-2 text-ellipsis min-h-[2rem]'>
                <FontAwesomeIcon icon={faPodcast} className='mr-2' />
                <Link to={podcastHome.path} onClick={() => window.scrollTo(0, 0)} >Podcasts: {podcastHome.label}</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-end'>
              <img className="h-4 md:h-4 lg:h-4 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>

          <div>
            {podcastHome.image.length > 0 && (
              <Link to={`/podcast/${podcastHome.id}`} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} >
                <img src={podcastHome.image} alt={podcastHome.name} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} className="w-full object-cover rounded-xl shadow-md hover:shadow-xl hover:shadow-sky-400/70 transform hover:scale-95 transition-transform duration-200" />
              </Link>
            )}
          </div>
          <div>
            <h2 className='text-xl text-sky-100 pt-2 line-clamp-3 text-ellipsis min-h-[3rem]'><span className='text-sky-300'>Podcast: </span>{podcastHome.name}</h2>
            <p className='text-s text-sky-200 mt-0.5'>Publisher: {podcastHome.publisher}</p>
            <p className='text-s text-sky-200 mt-0.5'>Total episodes: {podcastHome.total_episodes}</p>
          </div>
          <div className='flex flex-row justify-center mt-2'>
            <div className='flex basis-4/6 items-center mt-2'>
              <Link to={`/podcast/${podcastHome.id}`} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <MiniButton fullWidth={true} size={`text-xs md:text-xs lg:text-xs`}><FontAwesomeIcon icon={faCaretRight} />&emsp;Podcast</MiniButton>
              </Link>
            </div>
            <div className='flex basis-2/6 justify-center items-center'>
            <Link to={podcastHome.external_urls} target="_blank" rel="noopener noreferrer" ><img className="h-5 md:h-5 lg:h-5 transition-transform duration-600 ease-in-out" src='/images/logos/Spotify_Logo_RGB_White.png' alt='Logo' title="Listen on Spotify" /></Link>
            </div>
          </div>
        </div>
        ))}
      </div>



    </div>
  );
};

export default AlbumsPage;
