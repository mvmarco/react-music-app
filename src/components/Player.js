import { useRef, useState } from 'react';
/* 
  "useRef" is a way of connecting to the elements without doing: document.querySelector("audio")
  it is a way to grab something using react.
  So you can create a const with a null initial value, as below:
  const audioRef = useRef(null)
  then we pass it as a prop in our <audio> element

  The event callback, use audioRef.current (which is one of the key of the audio object) and
  calls a pre-existing function on audio called play();
  audioRef.current.play();



  // ####################################
  // ERROR: CONTROLLED AND UNCONTROLLED
  // ####################################

  /* 
    error: a component is changing an uncontrolled input of index.js type range to be controlled.
    Input elements should not switch from uncontrolled to controlled (or vice versa).

    Uncontrolled means that our input value is not associated to a state, so when the data changes
    associated to a state the input is still asociated to the input itself and not the react state 
    input. Once you associate the input value to the state, the component becomes controlled.

    1. uncontrolled component: input that has nothing to do with a state
    2. controlled component: value of the input is associated to  

    we got the error because, that mess up with the states:
    currentTime: 0,
    duration: 0,

    was set to null:
    currentTime: null,
    duration: null,
  */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from '@fortawesome/free-solid-svg-icons'


const Player = ({currentSong, isPlaying, setisPlaying}) => {
  // Ref
  const audioRef = useRef(null);

  // state I am gonna use only here: timing
  const [songInfo, setsongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  // Event Handlers
  const playSongHandler = () => {
    console.log(audioRef);
    if(isPlaying) {
      audioRef.current.pause();
      setisPlaying(!isPlaying)
    }else{
      audioRef.current.play();
      setisPlaying(!isPlaying)
    }
  }

  // this is connected to the onTimeUpdate event. Which let us update values in real time
  // this is connected to onLoadedMetadata, when the pages loads the info updated
  const timeUpdateHandler = (e) => {
    // from this event we can extract: the current time we are in the song and also the song duration
    console.log(e);
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    console.log(currentTime, duration);
    setsongInfo({...songInfo, currentTime: currentTime, duration: duration })
  }

  // onChange is the event for this callback to move the input range
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    console.log(e.target.value);
    setsongInfo({...songInfo, currentTime: e.target.value})
  }
  // function for formatting the time, using a stackOverflow formatting
  function formatTime(time) {
     return (Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2));
  }


  return (
    <div className="player-container">
      <div className="time-control">
        <p>{formatTime(songInfo.currentTime)}</p>
        <input
          onChange={dragHandler}
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          type="range"
        />
        <p>{formatTime(songInfo.duration)}</p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default Player;