import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// CREATE USER
export const signup = async (req, res) => {
    try {
      const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name
    });

    await user.save();
    return res.status(201).json({ message: "User registered succesfully" });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "something went wrong", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    res.status(200).json({ token, name: user.name });
  } catch (error) {
    res.status(500).json({ error: "Login failed", message: error.message });
  }
}

export const protcetedRoute = (req, res) => {
    res.status(200).json({ message: 'protected route access' });
}

export const findUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const name = User.find({ email });
    if(!name){
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(201).json(name.name);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error: error.message });
  }
}