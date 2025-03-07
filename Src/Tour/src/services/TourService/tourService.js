import { pool } from "../../config/db.js";


// get all tour 
export const getAllTour = async () => {
    try {
        const [tours] = await pool.query('SELECT * FROM tours');
        
        if (tours.length === 0) {
            return { state: false, message: 'No tours found', data: [] };
        }
        
        return { state: true, message: 'Tours retrieved successfully', data: tours };
    } catch (error) {
        console.error("Error fetching tours:", error);
        return { state: false, message: 'Failed to retrieve tours. Please try again later.' };
    }
};

// create tour 
export const createTour = async (tour) => {
    try {
        const query = `INSERT INTO tours (name, typeoftours_id, endplace, title,, day_number, night_number, image ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [tour.name, tour.typeoftours_id, tour.endplace, tour.title,tour.day_number, tour.night_number, tour.image];
        await pool.query(query, values);
        return {state : true,message :'create tour successfully'};
    } catch(error){
        console.error('error when fetching create tour ', error );
        return { state : false, message : 'Failed to create tour. Please handle problem ' + error, };
    }
}
