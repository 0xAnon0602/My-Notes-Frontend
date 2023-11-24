import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import "../CSS/Home.css"

function Login() {

  const googleAuth = () => {
    window.open(
        `http://localhost:8080/auth/google`,
        "_self"
    );
};

  return (
  <div className="main">
      <div className="main-title">
        <p>My Notes</p>
      </div>

      <Button variant="contained" size="small" onClick={googleAuth}>
          Sign in with Google
      </Button>

  </div>
  );
}

export default Login;
