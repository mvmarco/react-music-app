import {FontAwesomeIcon, fontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons"

const Nav = () => {
  return(
    <nav>
      <h1>React Music App</h1>
      <button>
        Library
        <FontAwesomeIcon icon={faMusic}/>
      </button>
    </nav>
  )
}

export default Nav;