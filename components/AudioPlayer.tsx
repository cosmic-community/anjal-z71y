'use client';

import { useEffect, useRef, useState, ChangeEvent } from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
  coverImage?: string;
}

export default function AudioPlayer({ src, title, coverImage }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
    };
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration || 0);
  };

  const formatTime = (time: number): string => {
    if (!time || Number.isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-4 mb-4">
        {coverImage && (
          <img
            src={coverImage}
            alt={title}
            width={64}
            height={64}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-amber-400 font-semibold">
            Now Playing
          </p>
          <h3 className="text-slate-100 font-semibold truncate">{title}</h3>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => skip(-15)}
          className="text-slate-300 hover:text-amber-400 transition-colors"
          aria-label="Rewind 15 seconds"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors disabled:opacity-50"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={() => skip(15)}
          className="text-slate-300 hover:text-amber-400 transition-colors"
          aria-label="Forward 15 seconds"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs text-slate-400 w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1.5 rounded-full accent-amber-500 bg-slate-700 cursor-pointer"
          />
          <span className="text-xs text-slate-400 w-10">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}