import React from 'react';
import Button from '@mui/material/Button';
import { SocialIcon } from 'react-social-icons';

import "../CSS/Login.css";

function Login() {
  const googleAuth = () => {
    window.open(
      `http://localhost:8080/auth/google`,
      "_self"
    );
  };

  return (
    <div className="login-page">
      <div className="main-home">
        <div className="main-title-home">
          <p>My Notes</p>
        </div>

        <Button variant="contained" size="small" onClick={googleAuth}>
          Sign in with Google
          <img className='google-button-image' src="google.png" alt="google icon" />
        </Button>

        <div className="footer">
          <SocialIcon url="https://twitter.com/0xAnon0602" style={{ height: 30, width: 30 }} />
          <SocialIcon url="https://github.com/0xAnon0602" style={{ height: 30, width: 30 }} />
        </div>
        <p>Created by 0xAnon</p>
      </div>
    </div>
  );
}

export default Login;
