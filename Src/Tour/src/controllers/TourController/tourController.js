import tourModel from '../../models/tourModel.js';
import { getAllTour, createTour } from '../../services/TourService/tourService.js';


// get all tour enpoint
export const getAllTourApi =  async (req, res) => {
    try {
        // Register user using auth service
        const response = await getAllTour();
        if (response.state) {
            return res.status(201).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.error('Error in user registration:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'get All tour failed. Please try again later.' 
        });
    }
};


// create tour enpoint 
export const createTourApi = async (req, res) => {
    const { name, typeoftours_id, endplace, title, day_number, night_number, image } = req.body;
    // Validate required fields
    if (!name || !typeoftours_id || !endplace || !title || !day_number || !night_number || !image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create user instance
    const tour = new tourModel({name, typeoftours_id, endplace, title, day_number, night_number, image });

    try {
        // Register user using auth service
        const response = await createTour(tour);
        if (response.success) {
            return res.status(201).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.error('Error in user registration:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'create tour failed. Please try again later.' 
        });
    }
};