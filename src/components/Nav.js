import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons"

const Nav = ({setLibraryStatus, libraryStatus}) => {
  const openLibrary = () => {
    setLibraryStatus(!libraryStatus)
  };
  return (
    <nav>
      <h1>React Music App</h1>
      <button onClick={openLibrary}>
        Library
        <FontAwesomeIcon className="icon" icon={faMusic} />
      </button>
    </nav>
  );
}

export default Nav;