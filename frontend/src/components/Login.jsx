import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    //  const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post("http://localhost:3000/api/auth/login", {
                email: email.toLowerCase(), password
            }).then((response) => {
                console.log(response);
                const { token, name } = response.data;
                localStorage.setItem("jwtToken", token);
                localStorage.setItem("name", name);
                console.log("Login successful")

                navigate("/home")
            })      
        } catch (error) {
            console.error(error);
             setError(error.response?.data?.error || "Login failed");
        }
    }

  return (
    <div>
      <div className="w-full my-16">
        <h1 className="w-fit mx-auto text-5xl">Welcome</h1>
        <h2 className="w-fit mx-auto text-xl">Sign in to continue</h2>
      </div>
      <form onSubmit={handleLogin}>
        <Box
          component="form"
          className="w-2/3 mx-auto"
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            className="w-full text-2xl"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box className="w-2/3 mx-auto mt-4">
          <TextField
            id="password"
            className="w-full text-2xl"
            label="Password"
            variant="standard"
            type='password'
            // type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        {error && <p style={{ color: "red" }}>{error}</p>}

        </Box>
        <div className="login-btn w-2/3 mx-auto mt-12">
          <Button
            variant="contained"
            sx={{
                backgroundColor: '#5DCC53',
                '&:hover': {
                  backgroundColor: 'darkgreen',
                },
              }}
            className="w-full"
            type="submit"
          >
            Login
          </Button>
        </div>
        <div className="login-btn w-2/3 mx-auto mt-8">
          <Button
            variant="contained"
            className="w-full"
            sx={{
                backgroundColor: '#EF5E5F',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
          >
            Create Acount
          </Button>
        </div>
      </form>
    </div>
  );
}
