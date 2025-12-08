import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const token = generateToken(savedUser._id);

        res.status(201).json({
            _id: savedUser._id,
            username: savedUser.username,
            token,
        });
    } catch (error) { 
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });  

    if(user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id);
        res.json({
            _id: user._id,
            username: user.username,
            token,
        });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
}