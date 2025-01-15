import React, { useState, useEffect } from 'react'
import axios from 'axios';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        
    }, [])

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div className="inputs">
          <label>Email:</label>
          <input
            type="text"
            className="border border-black rounded-md mt-2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label>Password:</label>
          <input
            type="password"
            className="border border-black rounded-md mt-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
