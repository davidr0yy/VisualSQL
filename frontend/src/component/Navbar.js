import { useContext } from 'react';
import jwt_decode from 'jwt-decode';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem('authTokens');

  let user_id;
  if (token) {
    const decoded = jwt_decode(token);
    user_id = decoded.user_id;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to={token ? "/dashboard" : "/"}>
            <img style={{ width: '80px', padding: '6px' }} src="https://i.imgur.com/juL1aAc.png" alt="" />
          </Link>
          <button 
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {token !== null && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link font-weight-bold" to="/dashboard">Dashboard</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link font-weight-bold" to="/quizcomp">Problem-Solving</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link font-weight-bold" to="/modules">Modules</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link font-weight-bold" to="/visprogpage">Visual Programming</Link>
                  </li>

                </>
              )}
            </ul>

            {token !== null && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <div className="nav-link dropdown-toggle" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaUserCircle />
                  </div>
                  <ul className="dropdown-menu" aria-labelledby="userDropdown">
                    <li><span className="dropdown-item">{user ? user.name : ''}</span></li>
                    <li><span className="dropdown-item" onClick={logoutUser}>Logout</span></li>
                  </ul>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
