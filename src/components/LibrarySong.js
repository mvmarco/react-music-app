const LibrarySong = ({song, setcurrentSong, audioRef, isPlaying}) => {

  const songSelectHandler = () => {
    const selectedSong = song
    console.log(selectedSong);
    // then we update the currentSong, the state, with what we just selected
    setcurrentSong(selectedSong);
    // check if the song is playing
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
  };
  return (
    <div onClick={songSelectHandler} className="library-song">
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
