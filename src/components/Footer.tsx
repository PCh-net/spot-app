import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlugCircleBolt, faHome, faEthernet, faCircleChevronUp, faIcons, faGlobe } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {


  return (
    <div className="bg-gradient-to-tr from-sky-900 via-sky-700 to-sky-500 shadow-md">

      <div>

        <Link to="/categories/0JQ5DAqbMKFAXlCG6QvYQ4" className="block py-2 px-4 text-sm hover:bg-sky-500" onClick={() => window.scrollTo(0, 0)}>
          <span className='text-xl text-sky-100 hover:text-sky-200'>
            <FontAwesomeIcon icon={faPlugCircleBolt} className='text-xl' />&emsp;Energy
          </span>
        </Link>     
        <Link to="/categories/0JQ5DAqbMKFA6SOHvT3gck" className="block py-2 px-4 text-sm hover:bg-sky-500" onClick={() => window.scrollTo(0, 0)}>
          <span className='text-xl text-sky-100 hover:text-sky-200'>
            <FontAwesomeIcon icon={faIcons} className='text-xl' />&emsp;Dance
          </span>
        </Link>
        <Link to="/albums" className="block py-2 px-4 text-sm hover:bg-sky-500" onClick={() => window.scrollTo(0, 0)}>
          <span className='text-xl text-sky-100 hover:text-sky-200'>
            <FontAwesomeIcon icon={faGlobe} className='text-xl' />&emsp;United hits
          </span>
        </Link>
        <Link to="/playlist/1ajovwTqrfeMBiytNq2Yrg" className="block py-2 px-4 text-sm hover:bg-sky-500" onClick={() => window.scrollTo(0, 0)}>
          <span className='text-xl text-sky-100 hover:text-sky-200'>
            <FontAwesomeIcon icon={faEthernet} className='text-xl' />&emsp;Matrix
          </span>
        </Link>
        <Link to="/" className="block py-2 px-4 text-sm hover:bg-sky-500" onClick={() => window.scrollTo(0, 0)}>
          <span className='text-xl text-sky-100 hover:text-sky-200'>
            <FontAwesomeIcon icon={faHome} className='text-xl' />&emsp;Up page
          </span>
        </Link>
        <div className="flex flex-row block py-6 px-4 text-sm hover:bg-sky-500 justify-center" >
           <img src="/images/logos/Spotify_Logo_RGB_White.png" alt="Spotify-Logo" className="h-6 md:h-6" />
          <span className='text-l text-sky-100 ml-4'>API 2023-2024 by PCh</span>
        </div>
      </div>

    </div>
  );
};

export default Footer;
