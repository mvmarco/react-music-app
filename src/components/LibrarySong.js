import {playAudio} from '../util.js'
const LibrarySong = ({songs, song, setcurrentSong, audioRef, isPlaying, setSongs}) => {

  const songSelectHandler = () => {
    const selectedSong = song;
    setcurrentSong(selectedSong);
    console.log(selectedSong);
    // add active state
    /* 
      other than changing the song clicked as current song, we want to change the status
      to active:true for the current song and active:false for the others

      you can either take "selectedSong" which is the current song clicked and compare it
      with the "song" of the new mapped array (newSongs), if it is equal, we change the 
      status (active true/false) and then we update the state with setSongs(newSongs);
      
      or we can take the song.id of the new mapped array (newSongs) compared to the id (which is the 
      id of the current song clicked) for this approach, put id in props

      PS: we do spread because song is an object, and we change the active status property
      Now all the songs that are not the current are false while the current is true
    */
    const newSongs = songs.map((song) => {
      if (selectedSong === song) {
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
    // then we update the currentSong, the state, with what we just selected
    setcurrentSong(selectedSong);
    // check if the song is playing
    playAudio(isPlaying, audioRef)
  };
  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
