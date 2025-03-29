import UserModel from '../../models/userModel.js';
import { registerUser, loginUser, getUserFromToken } from '../../services/UserService/authService.js';


// create register method
export const register = async (req, res) => {
    const { username, email, mobile, password, userType } = req.body;

    // Validate required fields
    if (!username || !email || !mobile || !password) {
        return res.status(400).json({ state: false, message: 'All fields are required' });
    }

    // Create user instance
    const user = new UserModel({ username, email, mobile, password, userType });

    try {
        // Register user using auth service
        const response = await registerUser(user);
        if (response.state) {
            return res.status(201).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.error('Error in user registration:', error);
        return res.status(500).json({ 
            state: false, 
            message: 'Registration failed. Please try again later.' 
        });
    }
};

// create login method
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ state: false, message: 'Email and password are required' });
    }

    try {
        // Call loginUser function from auth service
        const response = await loginUser(email, password);
        
        if (response.state) {
            return res.status(200).json(response); // Login stateful
        } else {
            console.log(response.message);
            return res.status(401).json(response); // Unauthorized
        }
    } catch (error) {
        console.error('Error in user login:', error);
        return res.status(500).json({ 
            state: false, 
            message: 'Login failed. Please try again later.' 
        });
    }
};


// get user detail
export const getUserDetails = async (req, res) => {
    
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    console.log(token);

    if (!token) {
        return res.status(401).json({ state: false, message: 'Token not provided' });
    }

    try {
        const response = await getUserFromToken(token);

        if (response.state) {
            return res.status(200).json({ state: true, user: response.user });
        } else {
            return res.status(401).json({ state: false, message: response.message });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ state: false, message: 'Failed to retrieve user details' });
    }
};
