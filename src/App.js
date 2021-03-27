import { useState } from "react";
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
  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  const [isPlaying, setisPlaying] = useState(false);
  return (
    <div className="App">
      <h1>React Music Player</h1>
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setisPlaying={setisPlaying}
      />
      <Library songs={songs} setcurrentSong={setcurrentSong} />
    </div>
  );
}

export default App;
