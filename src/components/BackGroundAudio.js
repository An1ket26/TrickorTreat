import React, { useEffect } from 'react';
import soundFile from './music.mp3';

const BackgroundAudio = (props) => {
  const audio = React.useRef(null);
  const playAudio = e => {
    audio.current.volume = 0.12;
    audio.current.play();
  };
  useEffect(()=>{
    playAudio();
  },[])
  return <audio src={soundFile} ref={audio} loop />;
};

export default BackgroundAudio;