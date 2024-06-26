import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPodcast } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../components/CustomButton';
import MiniButton from '../components/MiniButton';

const CategoriesPodcast = () => {

  return (
    <div className="container mx-auto py-4">
      <h1 className='text-2xl text-sky-100 mb-4'>Categories podcasts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <div className='flex flex-row'>
            <div className='flex basis-5/6 justify-start'>
              <span className='text-xl md:text-2xl lg:text-2xl text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faPodcast} spinPulse={true} />&emsp;
              <Link to="/podcasts/comedy" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} >Comedy</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-end'>
              <img className="h-6 md:h-6 lg:h-8 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <div className='flex flex-row'>
            <div className='flex basis-5/6 justify-start'>
              <span className='text-xl md:text-2xl lg:text-2xl text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faCircleInfo} />&emsp;
              <Link to="/podcasts/News" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} >News</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-end'>
              <img className="h-6 md:h-6 lg:h-8 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <div className='flex flex-row'>
            <div className='flex basis-5/6 justify-start'>
              <span className='text-xl md:text-2xl lg:text-2xl text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faCircleInfo} />&emsp;
              <Link to="/podcasts/0JQ5DAqbMKFDXXwE9BDJAr" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} >Rock</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-end'>
              <img className="h-6 md:h-6 lg:h-8 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <div className='flex flex-row'>
            <div className='flex basis-5/6 justify-start'>
              <span className='text-xl md:text-2xl lg:text-2xl text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faCircleInfo} />&emsp;
              <Link to="/podcasts/0JQ5DAqbMKFOOxftoKZxod" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} >RADAR</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-end'>
              <img className="h-6 md:h-6 lg:h-8 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <div className='flex flex-row'>
            <div className='flex basis-5/6 justify-start'>
              <span className='text-xl md:text-2xl lg:text-2xl text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faCircleInfo} />&emsp;
              <Link to="/podcasts/0JQ5DAqbMKFIpEuaCnimBj" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}>Soul</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-end'>
              <img className="h-6 md:h-6 lg:h-8 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <div className='flex flex-row'>
            <div className='flex basis-5/6 justify-start'>
              <span className='text-xl md:text-2xl lg:text-2xl text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faCircleInfo} />&emsp;
              <Link to="/podcasts/0JQ5DAqbMKFFtlLYUHv8bT" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}>Alternative</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-end'>
              <img className="h-6 md:h-6 lg:h-8 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <div className='flex flex-row'>
            <div className='flex basis-5/6 justify-start'>
              <span className='text-xl md:text-2xl lg:text-2xl text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faCircleInfo} />&emsp;
              <Link to="/podcasts/0JQ5DAqbMKFRY5ok2pxXJ0" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}>Cooking & Dining</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-end'>
              <img className="h-6 md:h-6 lg:h-8 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <div className='flex flex-row'>
            <div className='flex basis-5/6 justify-start'>
              <span className='text-xl md:text-2xl lg:text-2xl text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faCircleInfo} />&emsp;
              <Link to="/podcasts/0JQ5DAqbMKFCfObibaOZbv" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}>Gaming</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-end'>
              <img className="h-6 md:h-6 lg:h-8 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>
        </div>







      </div>
    </div>

  );


};

export default CategoriesPodcast;