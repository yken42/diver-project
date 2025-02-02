import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    //  const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post("http://localhost:3000/api/auth/login", {
                username: username.toLowerCase(), password
            },
          {
            withCredentials: true,
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
        <h1 className="w-fit mx-auto text-5xl">ברוך הבא</h1>
        <h2 className="w-fit mx-auto text-xl">יש להתחבר על מנת להמשיך</h2>
      </div>
      <form onSubmit={handleLogin}>
        <Box
          className="w-2/3 mx-auto"
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            className="w-full text-2xl"
            label="שם משתמש"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box className="w-2/3 mx-auto mt-4">
          <TextField
            id="password"
            className="w-full text-2xl"
            label="סיסמה"
            variant="standard"
            type="password"
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
              backgroundColor: "#5DCC53",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
            className="w-full"
            type="submit"
          >
            התחבר
          </Button>
        </div>
        <div className="login-btn w-2/3 mx-auto mt-8">
          <Button
            variant="contained"
            className="w-full"
            sx={{
              backgroundColor: "#EF5E5F",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
            onClick={() => navigate("/signup")}
          >
            הרשמה{" "}
          </Button>
        </div>
      </form>
    </div>
  );
}
