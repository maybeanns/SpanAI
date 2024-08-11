"use client";

import { useState, useEffect } from 'react';
import { PlayCircle, Pause, SkipForward, RotateCcw, Music, Play, Square, ChevronDown } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const audioFiles = [
    { name: 'Song 1', path: '/audi/audio/audio1.mp3' },
    { name: 'Song 2', path: '/audi/audio/audio2.mp3' },
    { name: 'Song 3', path: '/audi/audio/audio3.mp3' }
];

export function TopNavbar() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create a new Audio instance when the currentAudio changes
    const newAudio = new Audio(audioFiles[currentAudio].path);
    setAudio(newAudio);

    // Play the new audio when the audio instance is created
    if (isPlaying) {
      newAudio.play();
    }

    // Cleanup function to stop the audio when the component unmounts or when the audio changes
    return () => {
      newAudio.pause();
      newAudio.src = ''; // Clear the source
    };
  }, [currentAudio]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleStopwatch = () => setIsRunning(!isRunning);
  const resetStopwatch = () => setTime(0);

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const changeAudio = (index: number) => {
    if (audio) {
      audio.pause(); // Pause the current audio
    }
    setIsPlaying(false); // Reset playing state
    setCurrentAudio(index); // Change the current audio
  };

  return (
    <nav className="bg-opacity-10 backdrop-filter backdrop-blur-lg bg-gray-500 text-white p-3 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <h1 className="text-xl font-semi-bold"><span style={{ color: 'black', fontFamily: 'Aquire', marginLeft: '10px' }} >SpanAI</span></h1>
      <div className="flex items-center space-x-4">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center bg-gray-700 px-3 py-2 rounded-md">
              <Music className="mr-2" size={20} />
              <ChevronDown size={20} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="bg-gray-700 rounded-md p-2 shadow-lg">
            {audioFiles.map((file, index) => (
              <DropdownMenu.Item 
                key={index} 
                className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-600"
                onClick={() => changeAudio(index)}
              >
                {file.name}
                {index === currentAudio && (
                  <button onClick={togglePlay} className="ml-2">
                    {isPlaying ? <Pause size={20} /> : <PlayCircle size={20} />}
                  </button>
                )}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <div className="bg-gray-700 px-3 py-2 rounded-md flex items-center space-x-2">
          <div className="text-lg font-mono">
            {Math.floor(time / 3600).toString().padStart(2, '0')}:
            {Math.floor((time % 3600) / 60).toString().padStart(2, '0')}:
            {(time % 60).toString().padStart(2, '0')}
          </div>
          <button onClick={toggleStopwatch} className="p-1 rounded-full hover:bg-green-600">
            {isRunning ? <Square size={20} /> : <Play size={20} />}
          </button>
          <button onClick={resetStopwatch} className="p-1 rounded-full hover:bg-red-500">
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
