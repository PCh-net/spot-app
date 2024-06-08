import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import MiniButton from '../components/MiniButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-tr from-sky-900 via-sky-700 to-sky-500 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <Link to="/" className="flex items-center py-5 px-2">
                <img src="/images/logos/Spotify_Logo_RGB_White.png" alt="Spotify-Logo-White" className="h-8 md:h-8 lg:h-8" />

              </Link>
            </div>
            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" ><MiniButton fullWidth={true} >Home page</MiniButton></Link>
              <Link to="/albums" className='pl-4' ><MiniButton fullWidth={true} >Albums</MiniButton></Link>
              <Link to="/playlist" className='pl-4' ><MiniButton fullWidth={true} >Playlist</MiniButton></Link>
              <Link to="/podcast" className='pl-4' ><MiniButton fullWidth={true} >Podcast</MiniButton></Link>
            </div>
          </div>
          {/* mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="mobile-menu-button">
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-white pr-4" size="lg" />
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div className={isOpen ? 'mobile-menu md:hidden' : 'hidden'}>

        <Link to="/" className="block py-2 px-4 text-sm hover:bg-sky-500">
          <span className='text-xl text-sky-100 hover:text-sky-100'>
            <FontAwesomeIcon icon={faCaretRight} className='text-xl' />&emsp;Home
          </span>
        </Link>     
        <Link to="/albums" className="block py-2 px-4 text-sm hover:bg-sky-500">
          <span className='text-xl text-sky-100 hover:text-sky-100'>
            <FontAwesomeIcon icon={faCaretRight} className='text-xl' />&emsp;Albums
          </span>
        </Link>
        <Link to="/playlist" className="block py-2 px-4 text-sm hover:bg-sky-500">
          <span className='text-xl text-sky-100 hover:text-sky-100'>
            <FontAwesomeIcon icon={faCaretRight} className='text-xl' />&emsp;Playlist
          </span>
        </Link>
        <Link to="/podcast" className="block py-2 px-4 text-sm hover:bg-sky-500">
          <span className='text-xl text-sky-100 hover:text-sky-100'>
            <FontAwesomeIcon icon={faCaretRight} className='text-xl' />&emsp;Podcast
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
