import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { Context } from '../../context/Context';
import { LoginSuccess, LoginFailure, LoginStart } from '../../context/Actions';

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginStart());
    try {
      const response = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch(LoginSuccess(response.data));
      window.location.replace('/');
    } catch (error) {
      dispatch(LoginFailure());
    }
  };

  console.log(isFetching);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        {/* username */}
        <input
          className="loginInput"
          type="text"
          id=""
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        {/* password */}
        <input
          className="loginInput"
          type="password"
          id=""
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          <Link className="link" to="/login">
            Login
          </Link>
        </button>
      </form>
      <button className=" loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
