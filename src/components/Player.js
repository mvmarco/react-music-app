import { useRef } from 'react';
/* 
  "useRef" is a way of connecting to the elements without doing: document.querySelector("audio")
  it is a way to grab something using react.
  So you can create a const with a null initial value, as below:
  const audioRef = useRef(null)
  then we pass it as a prop in our <audio> element

  The event callback, use audioRef.current (which is one of the key of the audio object) and
  calls a pre-existing function on audio called play();
  audioRef.current.play();
*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPlay,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'


const Player = ({currentSong, isPlaying, setisPlaying}) => {
  // Ref
  const audioRef = useRef(null);
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
  // state I am gonna use only here: timing
  return (
    <div className="player-container">
      <div className="time-control">
        <p>Start Time</p>
        <input type="range"/>
        <p>End Time</p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft}/>
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay}/>
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight}/>
      </div>
      <audio ref={audioRef} src={currentSong.audio}></audio>
    </div>
  )
}

export default Player;