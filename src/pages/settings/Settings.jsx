import './settings.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

import {
  UpdateFailure,
  UpdateStart,
  UpdateSuccess,
} from '../../context/Actions';

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState('');
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const publicFolder = 'http://localhost:8080/images/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(UpdateStart());
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      console.log(filename);
      updatedUser.profilePic = filename;

      try {
        await axios.post('/upload', data);
      } catch (err) {}
    }

    try {
      const res = await axios.put('/user/' + user._id, updatedUser);
      setIsSuccess(true);
      dispatch(UpdateSuccess(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
      dispatch(UpdateFailure());
    }
  };

  return (
    <div className='settings'>
      <div className='settingsWrapper'>
        <div className='settingsTitle'>
          <span className='settingsTitleUpdate'>Update Your Account</span>
          <span className='settingsTitleDelete'>Delete Account</span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className='settingsPP'>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : publicFolder + user.profilePic
              }
              alt=''
            />
            <label htmlFor='fileInput'>
              <i className='settingsPPIcon far fa-user-circle'></i>
            </label>
            <input
              id='fileInput'
              type='file'
              style={{ display: 'none' }}
              className='settingsPPInput'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type='text'
            placeholder={user.username}
            name='name'
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type='email'
            placeholder={user.email}
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='settingsSubmitButton' type='submit'>
            Update
          </button>
          {isSuccess && (
            <span
              style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}
            >
              Profile has been updated
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
