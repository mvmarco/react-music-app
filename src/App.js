import { useState, useRef } from "react";
// import components
import Song from "./components/Song.js"
import Player from "./components/Player.js"
import Library from "./components/Library.js";
// import styles
import "./styles/app.scss";
// import data.js
import data from "./data.js";

/* 
  by default the first song of the array will be the first one to be played because of:
  const [currentSong, setcurrentSong] = useState(songs[0]);
*/

function App() {
  // ref
  const audioRef = useRef(null);
  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  const [isPlaying, setisPlaying] = useState(false);
  const [songInfo, setsongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  // events callbacks
  const timeUpdateHandler = (e) => {
    // from this event we can extract: the current time we are in the song and also the song duration
    console.log(e);
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    console.log(currentTime, duration);
    setsongInfo({ ...songInfo, currentTime: currentTime, duration: duration });
  };
  return (
    <div className="App">
      <h1>React Music Player</h1>
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setisPlaying={setisPlaying}
        setsongInfo={setsongInfo}
        songInfo={songInfo}
      />
      <Library
        songs={songs}
        setcurrentSong={setcurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setsongInfo={setsongInfo}
        setSongs={setSongs}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
