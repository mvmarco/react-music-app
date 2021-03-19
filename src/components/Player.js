import { useRef } from 'react';
/* 
  "useRef" is a way of connecting to the elements without doing: document.querySelector("audio")
  for instance. So you can create a const with a null initial value, as below:
  const audioRef = useRef(null)
  then we pass it as a prop in our <audio> element
*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPlay,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
const Player = ({currentSong}) => {
  // Ref
  const audioRef = useRef(null);
  // Event Handlers
  const playSongHandler = () => {
    console.log(audioRef);
  }
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