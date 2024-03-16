import { Link } from 'react-router-dom';
import MiniButton from '../components/MiniButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const TopRankMiddle = () => {

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-2xl text-sky-100 mb-4'>Toplisty</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
        <div className='flex flex-row justify-center mt-2'>
            <div className='flex basis-5/6 items-center'>
              <span className='text-sm md:text-xs text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faStar} />&nbsp;
              <Link to="/playlist/37i9dQZEVXbN6itCcaL3Tt" onClick={() => window.scrollTo(0, 0)} >Full playlist</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-center items-center'>
            <img className="h-4 md:h-4 lg:h-4 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>
          <Link to="/playlist/37i9dQZEVXbN6itCcaL3Tt" onClick={() => window.scrollTo(0, 0)} >
          <img 
            src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_pl_large.jpg"
            alt="Top 50 – Polska"
            className="p-4 w-full object-cover rounded"
          />
          </Link>
          <h1 className='text-sky-100 px-4 line-clamp-2 text-ellipsis min-h-[2rem]'>Top 50 Polska</h1>
          <Link to="/playlist/37i9dQZEVXbN6itCcaL3Tt" onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={true} >Playlist</MiniButton></Link>
        </div>

        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
        <div className='flex flex-row justify-center mt-2'>
            <div className='flex basis-5/6 items-center'>
              <span className='text-sm md:text-xs text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faStar} />&nbsp;
              <Link to="/playlist/2jpDnEecFdhiQwGoXfQyKp" onClick={() => window.scrollTo(0, 0)} >Full playlist</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-center items-center'>
            <img className="h-4 md:h-4 lg:h-4 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>
          <Link to="/playlist/37i9dQZEVXbMDoHDwVN2tF" onClick={() => window.scrollTo(0, 0)} >
          <img 
            src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_large.jpg"
            alt="Top 50 – Polska"
            className="p-4 w-full object-cover rounded"
          />
          </Link>
          <h1 className='text-sky-100 px-4 line-clamp-2 text-ellipsis min-h-[2rem]'>Top 50 Świat</h1>
          <Link to="/playlist/37i9dQZEVXbMDoHDwVN2tF" onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={true} >Playlist</MiniButton></Link>
        </div>

        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
        <div className='flex flex-row justify-center mt-2'>
            <div className='flex basis-5/6 items-center'>
              <span className='text-sm md:text-xs text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faStar} />&nbsp;
              <Link to="/albums/4bNiBmPncdmzzWdeUSs7DF" onClick={() => window.scrollTo(0, 0)} >Full album</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-center items-center'>
            <img className="h-4 md:h-4 lg:h-4 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>
          <Link to="/albums/4bNiBmPncdmzzWdeUSs7DF" onClick={() => window.scrollTo(0, 0)} >
          <img 
            src="https://i.scdn.co/image/ab67616d0000b27377ebade8c39cbe7caf7276b4"
            alt="Chłopi"
            className="p-4 w-full object-cover rounded"
          />
          </Link>
          <h1 className='text-sky-100 px-4 line-clamp-2 text-ellipsis min-h-[2rem]'>Chłopi</h1>
          <Link to="/albums/4bNiBmPncdmzzWdeUSs7DF" onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={true} >Chłopi</MiniButton></Link>
        </div>

        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
        <div className='flex flex-row justify-center mt-2'>
            <div className='flex basis-5/6 items-center'>
              <span className='text-sm md:text-xs text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faStar} />&nbsp;
              <Link to="/playlist/37i9dQZF1DX8C9xQcOrE6T" onClick={() => window.scrollTo(0, 0)} >Full playlist</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-center items-center'>
            <img className="h-4 md:h-4 lg:h-4 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
        </div>
        <Link to="/playlist/37i9dQZF1DX8C9xQcOrE6T" onClick={() => window.scrollTo(0, 0)} >
          <img 
            src="https://i.scdn.co/image/ab67706f00000002215fab676f73bd0b8e813692"
            alt="Disney®"
            className="p-4 w-full object-cover rounded"
          />
          </Link>
          <h1 className='text-sky-100 px-4 line-clamp-2 text-ellipsis min-h-[2rem]'>Disney®</h1>
          <Link to="/playlist/37i9dQZF1DX8C9xQcOrE6T" onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={true} >Disney®</MiniButton></Link>
        </div>

        {/*  */}
          <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <div className='flex flex-row justify-center mt-2'>
            <div className='flex basis-5/6 items-center'>
              <span className='text-sm md:text-xs text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faStar} />&nbsp;
              <Link to="/playlist/1ajovwTqrfeMBiytNq2Yrg" onClick={() => window.scrollTo(0, 0)} >Full playlist</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-center items-center'>
            <img className="h-4 md:h-4 lg:h-4 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>
          <Link to="/playlist/5psd8QSYtfo2Mkb2AWtNAK" onClick={() => window.scrollTo(0, 0)} >
            <img 
              src="https://i.scdn.co/image/ab67706c0000da84533f0dc8b11c744b357ce762"
              alt="Marvel"
              className="p-4 w-full object-cover rounded"
            />
            </Link>
            <h1 className='text-sky-100 px-4 line-clamp-2 text-ellipsis min-h-[2rem]'>Marvel</h1>
            <Link to="/playlist/5psd8QSYtfo2Mkb2AWtNAK" onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={true} >Marvel</MiniButton></Link>
          </div>

        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <div className='flex flex-row justify-center mt-2'>
            <div className='flex basis-5/6 items-center'>
              <span className='text-sm md:text-xs text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faStar} />&nbsp;
              <Link to="/playlist/1ajovwTqrfeMBiytNq2Yrg" onClick={() => window.scrollTo(0, 0)} >Full playlist</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-center items-center'>
            <img className="h-4 md:h-4 lg:h-4 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>

          <Link to="/playlist/1ajovwTqrfeMBiytNq2Yrg" onClick={() => window.scrollTo(0, 0)} >
            <img 
              src="https://i.scdn.co/image/ab67706c0000da84f08d52727cea792e18c50ea8"
              alt="MATRIX"
              className="p-2 w-full object-cover rounded"
            />
            </Link>
            <h1 className='text-sky-100 px-2 line-clamp-2 text-ellipsis min-h-[2rem]'>MATRIX</h1>
            <Link to="/playlist/1ajovwTqrfeMBiytNq2Yrg" onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={true} >MATRIX</MiniButton></Link>
          </div>






      </div>
      {/*  */}


    </div>

  );


};

export default TopRankMiddle;