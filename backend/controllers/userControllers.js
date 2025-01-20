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
    if(!username || !password){
      return res.status(401).json({ error: "יש למלא את כל השדות"})
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "שם משתמש או סיסמה שגוים, נסה שנית" });
    }
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
    //   return res.status(401).json({ error: "Password incorrect, try again later..." });
    // }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES,
    });
    
    res.status(200).json({ token, name: user.name });
  } catch (error) {
    res.status(500).json({ error: "Login failed", message: error.message });
  }
}

export const protcetedRoute = (req, res) => {
    res.status(200).json({ message: 'protected route access' });
}

// FIND USER BY EMAIL
export const findUserByEmail = async (req, res) => {
  try {
    const { username } = req.body;
    const name = await User.find({ username });
    if(!name){
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(201).json(name.name);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error: error.message });
  }
}