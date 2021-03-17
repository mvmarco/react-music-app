import Song from "./components/Song.js"
import Player from "./components/Player.js"
import "./styles/app.scss";
function App() {
  return (
    <div className="App">
      <h1>React Music Player</h1>
      <Song />
      <Player />
    </div>
  );
}

export default App;
