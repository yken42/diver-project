import React, { useState } from 'react';
import { Box, TextField } from "@mui/material";
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios
        .post("http://localhost:3000/api/auth/signup", {
          username: username.toLowerCase(),
          password,
          name,
        })
        .then((response) => {
          setUsername("");
          setPassword("");
          setName("");
          
          navigate('/login')
        });
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "הרשמה נכשלה");
    }
  };

  return (
    <div>
      <h1 className="w-fit mx-auto text-5xl my-16">הרשמה</h1>
      <form onSubmit={handleRegister} className="w-2/3 mx-auto">
        <Box className="w-full mb-6">
          <TextField
            id="username"
            className="w-full text-2xl"
            label="שם משתמש"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box className="w-full mb-6">
          <TextField
            id="password"
            className="w-full text-2xl"
            label="סיסמה"
            type="password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box className="w-full mb-6">
          <TextField
            id="name"
            className="w-full text-2xl"
            label="שם מלא"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{color: "green"}}>{message}</p>}

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#5DCC53",
            "&:hover": {
              backgroundColor: "darkgreen",
            },
          }}
          className="w-full"
          type="submit"
        >
          הרשם
        </Button>
      </form>
    </div>
  );
};
