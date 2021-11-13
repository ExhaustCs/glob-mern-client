import React, { useEffect, useState } from 'react';
import './sidebar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios('/categories');
      setCategories(response.data);
    };

    fetchCategories();
  }, []);
  return (
    <div className='sidebar'>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>ABOUT ME</span>
        <img src='https://th.wallhaven.cc/small/6o/6od3px.jpg' alt='' />
        {/* <img src={aboutMeProfile} alt="" /> */}
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas,
          distinctio tenetur. Id dolorem ab facere, odit natus deserunt in autem
          ullam at eveniet, quam quos.
        </p>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>CATEGORIES</span>
        <ul className='sidebarList'>
          {categories.map((cat, index) => (
            <Link key={index} to={`/?cat=${cat.name}`} className='link'>
              <li className='sidebarListItem'>{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>FOLLOW US</span>
        <div className='sidebarSocial'>
          <i className='sidebarIcon fab fa-twitter'></i>
          <i className='sidebarIcon fab fa-instagram'></i>
          <i className='sidebarIcon fab fa-linkedin-in'></i>
          <i className='sidebarIcon fab fa-youtube'></i>
        </div>
      </div>
    </div>
  );
}
