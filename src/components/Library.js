import LibrarySong from "./LibrarySong.js";

const Library = ({songs, setcurrentSong}) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            key={song.id}
            song={song}
            setcurrentSong={setcurrentSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
