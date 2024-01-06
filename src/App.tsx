import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import AlbumsPage from './pages/AlbumsPage';
import AlbumDetailsPage from './pages/AlbumDetailsPage';
import TrackDetailsPage from './pages/TrackDetailsPage';
import ArtistDetailsPage from './pages/ArtistDetailsPage';
import PlaylistsPage from './pages/PlaylistsPage';
import PlaylistDetailsPage from './pages/PlaylistDetailsPage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopRankMiddle from './components/TopRankMiddle';
import TopArtistMiddle from './components/TopArtistMiddle';
import CategoriesMiddle from './components/CategoriesMiddle';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
      <Navbar />
        <div className='bg-gradient-to-tr from-sky-900 via-sky-700 to-sky-500 min-h-screen p-2'>

          {/* Definicje ścieżek */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories/:id" element={<CategoriesPage />} />
            <Route path="/albums" element={<AlbumsPage />} />
            <Route path="/albums/:albumId" element={<AlbumDetailsPage />} />
            <Route path="/track/:trackId" element={<TrackDetailsPage />} />
            <Route path="/artist/:artistId" element={<ArtistDetailsPage />} />
            <Route path="/playlist" element={<PlaylistsPage />} />
            <Route path="/playlist/:playlistId" element={<PlaylistDetailsPage />} />


          </Routes>
          <TopRankMiddle />
          <TopArtistMiddle />  
          <CategoriesMiddle />   
        </div>

        <Footer />
      </Router>
    </HelmetProvider>
  );
};

export default App;
