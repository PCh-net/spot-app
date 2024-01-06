// components/AudioPlayer.tsx
import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';

interface AudioPlayerProps {
  src: string;
  trackId: string;
  onPlay: (trackId: string | null) => void;
  isPlaying: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, trackId, onPlay, isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    onPlay(trackId);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Resetowanie odtwarzacza
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [src]);

  return (
    <div className="audio-player mt-1 md:mt-2 lg:mt-3">
      <audio ref={audioRef} src={src} preload="auto" />
      <button onClick={handlePlay} className="play-button">
        <FontAwesomeIcon className='text-xl md:text-5xl text-sky-100 hover:text-sky-400 focus:text-sky-500 mr-2 md:mr-6' icon={faPlayCircle} />
      </button>
      <button onClick={() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        onPlay(null); // Resetowanie
      }} className="stop-button">
        <FontAwesomeIcon className='text-xl md:text-5xl text-sky-100 hover:text-sky-400 focus:text-sky-500 mr-3' icon={faStopCircle} />
      </button>
    </div>
  );
};

export default AudioPlayer;
