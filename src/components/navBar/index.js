import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="container-pages">
      <div className="images-movies">
        <img
          src="https://res.cloudinary.com/sahith/image/upload/v1625149563/Group_7399_tblq8t.png"
          alt="MOVIES"
        />
      </div>
      <ul className="pages-list">
        <li className="pages-cont">
          <Link to="/" className="pages">
            Home
          </Link>
        </li>
        <li className="nav-menu-item">
          <Link to="/popular" className="pages">
            Popular
          </Link>
        </li>
      </ul>
    </div>
    <div className="sign-button-cont">
      <input type="text" className="input-text" />
      <button type="button" className="button-img">
        <Link to="account-details">
          <img
            className="button-img"
            src="https://res.cloudinary.com/sahith/image/upload/v1625148791/Avatar_gunbd0.png"
            alt="signOut"
          />
        </Link>
      </button>
    </div>
  </nav>
)

export default Header
