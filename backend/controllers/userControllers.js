import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// CREATE USER
export const signup = async (req, res) => {
    try {
      const { username, password, name } = req.body;
      const existingUser = await User.findOne({ username: username.toLowerCase() });
      if(existingUser){
        return res.status(409).json({ error: "שם משתמש זה כבר קיים" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username: username.toLowerCase(),
        password: hashedPassword,
        name,
      });

    await user.save();
    return res.status(201).json({ message: "משתמש נוצר בהצלחה" });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "something went wrong", error: error.message });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: "יש למלא את כל השדות" });
    }

    // Find user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ error: "שם משתמש או סיסמה שגוים, נסה שנית" });
    }

    // Compare passwords
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Password incorrect" }); // Fix: Send this response and exit early
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES,
      });

      // Set the token in a cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        maxAge: 1000 * 60 * 60, // 1 hour
      });

      // Send success response
      return res.status(200).json({ name: user.name, token });
    });
  } catch (error) {
    // Catch any unexpected errors
    console.error(error);
    return res.status(500).json({ error: "Login failed", message: error.message });
  }
};

export const protcetedRoute = (req, res) => {
    res.status(200).json({ message: 'protected route access' });
}


export const logout = async (req, res) => {
  res.cookie("token", '', {
    httpOnly: true,
    secure: false,
    maxAge: 0
  })

  res.status(201).json({ message: "Logged out successfully" });
}