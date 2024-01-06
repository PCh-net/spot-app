import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MiniButton from '../components/MiniButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import XMiniButton from '../components/XMiniButton';

const TopArtistMiddle = () => {

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-2xl text-sky-100 mb-4'>Artist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/*  */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <div className='flex flex-row mt-2'>
            <div className='flex basis-5/6 justify-start'>
              <span className='text-sm md:text-xs text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faCircleInfo} />&emsp;
              <Link to="/artist/4sr6pTa4Olxkace2YcOzv8" onClick={() => window.scrollTo(0, 0)} >Artist info</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-end'>
              <img className="h-6 md:h-4 lg:h-4 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>

          <div className='flex flex-row justify-center mt-2'>
            <div className='flex basis-2/6 justify-start'>
              <img 
                src="https://i.scdn.co/image/ab6761610000e5eb5498e5508dda4a7e2940c2e7"
                alt="Cyberwaste"
                className="p-2 w-full object-cover rounded"
              />
            </div>
            <div className='flex flex-col basis-5/6 justify-end'>
              <h3 className='text-sm md:text-l lg:text-2xl text-sky-100 line-clamp-2 text-ellipsis min-h-[2rem]'>
              Cyberwaste / Albums 20
              </h3>
              <Link to="/artist/4sr6pTa4Olxkace2YcOzv8" onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={true} >Cyberwaste</MiniButton></Link>
              <p><span className='text-l text-sky-200'>Album: Flowers</span></p>
              <Link to="/albums/54fYqRAILtXrK1SYiUXlvh" onClick={() => window.scrollTo(0, 0)} ><XMiniButton fullWidth={true} >Flowers</XMiniButton></Link>
            </div>
          </div>
        </div>

        {/* ----------------------- */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-500 rounded shadow-md hover:shadow-xl items-center p-2">
          <div className='flex flex-row mt-2'>
            <div className='flex basis-5/6 justify-start'>
              <span className='text-sm md:text-xs text-sky-200 hover:text-sky-100 hover:underline-offset-1 ml-2'>
              <FontAwesomeIcon icon={faCircleInfo} />&emsp;
              <Link to="/artist/0U0gFFWxrl8aNyCJaLaglC" onClick={() => window.scrollTo(0, 0)} >Artist info</Link>
              </span>
            </div>
            <div className='flex basis-1/6 justify-end'>
              <img className="h-6 md:h-4 lg:h-4 mr-2" src='/images/logos/Spotify_Icon_RGB_White.png' alt='Logo' />
            </div>
          </div>

          <div className='flex flex-row justify-center mt-2'>
            <div className='flex basis-2/6 justify-start'>
              <img 
                src="https://i.scdn.co/image/ab6761610000e5eb98b89ecf68a9ad729b6a1cab"
                alt="Kora"
                className="p-2 w-full object-cover rounded"
              />
            </div>
            <div className='flex flex-col basis-5/6 justify-end'>
              <h3 className='text-sm md:text-l lg:text-2xl text-sky-100 line-clamp-2 text-ellipsis min-h-[2rem]'>
              Kora / Albums 20
              </h3>
              <Link to="/artist/0U0gFFWxrl8aNyCJaLaglC" onClick={() => window.scrollTo(0, 0)} ><MiniButton fullWidth={true} >Kora</MiniButton></Link>
              <p><span className='text-l text-sky-200'>Album: Ping Pong</span></p>
              <Link to="/albums/5mtDOgizMcxulFSZOtuzMV" onClick={() => window.scrollTo(0, 0)} ><XMiniButton fullWidth={true} >Ping Pong</XMiniButton></Link>
            </div>
          </div>
        </div>

        {/*  */}

      </div>
      {/*  */}

    </div>

  );


};

export default TopArtistMiddle;