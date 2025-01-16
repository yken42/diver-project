import React, { useState, useEffect } from 'react'
import axios from 'axios';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [name, setName] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post("http://localhost:3000/api/auth/login", {
                email, password
            }).then((response) => {
                console.log(response);
                const { token, name } = response.data;
                localStorage.setItem("jwtToken", token);
                setToken(token);
                setName(name);
                console.log("Login successful")
            })      
        } catch (error) {
            console.error(error);
             setError(error.response?.data?.error || "Login failed");
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setToken("");
        setName("");
        setEmail("");
        setPassword("");
    }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="inputs">
          <label>Email:</label>
          <input
            type="text"
            className="border border-black rounded-md mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label>Password:</label>
          <input
            type="password"
            className="border border-black rounded-md mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {token && <p style={{ color: "green" }}>Welcome {name}</p>}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
