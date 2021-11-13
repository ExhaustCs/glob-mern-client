import './topbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { Logout } from '../../context/Actions';
import axios from 'axios';

export default function TopBar() {
  const location = useLocation();
  const path = location.pathname;

  const [profilePicture, setProfilePicture] = useState(false);
  const { user, dispatch } = useContext(Context);
  const publicFolder = 'https://glob-a-blog-app.herokuapp.com/images/';
  const handleLogout = () => {
    dispatch(Logout());
    window.location.replace('/');
  };

  useEffect(() => {
    const checkProfilePicture = async () => {
      try {
        const path = publicFolder + user.profilePic;
        await axios(path);
        setProfilePicture(true);
      } catch (error) {
        setProfilePicture(false);
      }
    };
    checkProfilePicture();
  }, []);

  return (
    <div className='top'>
      <div className='topLeft'>
        <i className='topIcon fab fa-twitter'></i>
        <i className='topIcon fab fa-instagram'></i>
        <i className='topIcon fab fa-linkedin-in'></i>
        <i className='topIcon fab fa-youtube'></i>
      </div>
      <div className='topCenter'>
        <ul className='topList'>
          <li className='topListItem'>
            <Link className='link' to='/'>
              HOME
            </Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to='/about'>
              ABOUT
            </Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to='/contact'>
              CONTACT
            </Link>
          </li>

          <li className='topListItem'>
            <Link className='link' to='/write'>
              CREATE POST
            </Link>
          </li>
          <li className='topListItem' onClick={handleLogout}>
            {path !== '/settings' && user && 'LOGOUT'}
          </li>
        </ul>
      </div>
      <div className='topRight'>
        {user ? (
          <Link className='link' to='/settings'>
            {!profilePicture ? (
              <i className='fas fa-user'></i>
            ) : (
              <img
                className='topImg'
                src={publicFolder + user.profilePic}
                alt=''
              />
            )}
          </Link>
        ) : (
          <ul className='topList'>
            <li className='topListItem'>
              <Link className='link' to='/login'>
                LOGIN
              </Link>
            </li>
            <li className='topListItem'>
              <Link className='link' to='/register'>
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i className='topSearchIcon fas fa-search'></i>
      </div>
    </div>
  );
}
