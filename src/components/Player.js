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

const Player = ({
  isPlaying,
  setisPlaying,
  audioRef,
  setsongInfo,
  songInfo,
  songs,
  currentSong,
  setcurrentSong,
  setSongs,
}) => {
  // Ref,  it is moved to App. so we can use it to LibrarySong.js when you click the song there, it plays
  // const audioRef = useRef(null);

  // state I am gonna use only here: timing, moved to the app
  /*
    const [songInfo, setsongInfo] = useState({
      currentTime: 0,
      duration: 0,
    });
   */

  /*
    // REMOVED IT BECAUSE IT IS DOUBLE ON THE LIBRARYSONG
    // UseEffect
    // when you skip song also the library song gets updated
    useEffect(() => {
      const newSongs = songs.map((song) => {
        if (currentSong.id === song.id) {
          return {
            ...song,
            active: true,
          };
        } else {
          return {
            ...song,
            active: false,
          };
        }
      });
      setSongs(newSongs);
    }, [currentSong]);
    // run this function all the time the current song is updated.
    // basically when the current song changes, the status is active, and active status = hover LibrarySong
 */
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (currentSong.id === nextPrev.id) {
        return {
        ...song,
        active: true,
        };
      } else {
        return {
        ...song,
        active: false,
        };
      }
    });
    setSongs(newSongs)
  }
  // Event Handlers
  const playSongHandler = () => {
    console.log(audioRef);
    if (isPlaying) {
      audioRef.current.pause();
      setisPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setisPlaying(!isPlaying);
    }
  };

  // this is connected to the onTimeUpdate event. Which let us update values in real time
  // this is connected to onLoadedMetadata, when the pages loads the info updated
  // moved to the App
  /*   const timeUpdateHandler = (e) => {
    // from this event we can extract: the current time we are in the song and also the song duration
    console.log(e);
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    console.log(currentTime, duration);
    setsongInfo({...songInfo, currentTime: currentTime, duration: duration })
  } */

  // onChange is the event for this callback to move the input range
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    console.log(e.target.value);
    setsongInfo({ ...songInfo, currentTime: e.target.value });
  };
  // function for formatting the time, using a stackOverflow formatting
  function formatTime(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  const skipTrackHandler = async (direction) => {
    // get the index of the current song
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    // if the class is equal to skip-forward the change the current song, using index +1
    // but to prevent the last song to skip to nothing we need to add the "modules" %
    // if 8 % 8 is equal to 0, 0 will be our index, so it starts again from the beginning
    /* 
      if 2 % 8 is equal to 2, 2 will be the index. 
      It's really supper easy to figure out the results of modulo when the first number is smaller. 
      The result is always equal the the first (smaller) number.
      Because the second number is larger, it 'goes into' the first number zero times and the remainder 
      is the entirety of this first number.

      if you wanna go back, and the index is 0 you cannot go index -1. Because index -1 does not exist.
      so we need to make a ternary where if the current index is 0 you take the song.length -1
      and get index 7. If you are not at current index 9 you can just go back currentIndex - 1
      we need to return it either one of the two ifs and update the 

    */
    if (direction === "skip-forward") {
     await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
     activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    } else if (direction === "skip-back") {
      await setcurrentSong(songs[currentIndex - 1] || songs[songs.length - 1]);
      activeLibraryHandler(songs[currentIndex - 1] || songs[songs.length - 1]);
    }
    // this line waits for the songs to load before we can actually play them
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  const trackAnim = {
    transform: `translateX(${songInfo.animationPertantage}%)`,
  };
  return (
    <div className="player-container">
      <div className="time-control">
        <p style={{ width: "4ch", boxSizing: "content-box" }}>
          {formatTime(songInfo.currentTime)}
        </p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            value={songInfo.currentTime}
            min={0}
            max={songInfo.duration || 0}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>
          {songInfo.duration ? formatTime(songInfo.duration) : "0:00"}
        </p>
      </div>

      <div className="player-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;