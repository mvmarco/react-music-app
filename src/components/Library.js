import LibrarySong from "./LibrarySong.js";

const Library = ({
  songs,
  setcurrentSong,
  audioRef,
  isPlaying,
  setsongInfo,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            id={song.id}
            key={song.id}
            song={song}
            setcurrentSong={setcurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setsongInfo={setsongInfo}
            songs={songs}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
