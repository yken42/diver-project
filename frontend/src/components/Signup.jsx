import React from 'react'

export const Signup = () => {
  return (
    <div>
        <form>
            <label>Email:</label>
            <input type="text" />

            <label>Password:</label>
            <input type="password" />

            <label>Full Name:</label>
            <input type="text" />

            <button type='submit'>Sign Up</button>
        </form>
    </div>
  )
}
