import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import './home.css';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const { search } = location;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios('/post' + search);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className='home'>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
