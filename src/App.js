import { useState, useRef } from "react";
// import components
import Song from "./components/Song.js"
import Player from "./components/Player.js"
import Library from "./components/Library.js";
import Nav from "./components/Nav"
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
    animationPertantage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false)
  // events callbacks
  const timeUpdateHandler = (e) => {
    // from this event we can extract: the current time we are in the song and also the song duration
    console.log(e);
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    console.log(currentTime, duration);
    // calculate percentage
    const roundedCurrent = Math.round(currentTime)
    const roundedDuration = Math.round(duration)
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    console.log('check here', roundedCurrent,roundedDuration, animation);
    setsongInfo({ ...songInfo, currentTime: currentTime, duration: duration, animationPertantage: animation });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setcurrentSong(songs[currentIndex - 1] || songs[songs.length - 1]);
    if(isPlaying) audioRef.current.play();
  }
  return (
    <div className="App">
      <Nav setLibraryStatus={setLibraryStatus} libraryStatus={libraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        setcurrentSong={setcurrentSong}
        isPlaying={isPlaying}
        setisPlaying={setisPlaying}
        setsongInfo={setsongInfo}
        songInfo={songInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setcurrentSong={setcurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setsongInfo={setsongInfo}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
