import tourModel from '../../models/tourModel.js';
import detailtourModel from '../../models/detailtourModel.js';
import { getAllTour, createTour ,createDetailTour ,getAllDetailTourByTourId } from '../../services/TourService/tourService.js';


// get all tour enpoint
export const getAllTourMethod =  async (req, res) => {
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
            state: false, 
            message: 'get All tour failed. Please try again later.' 
        });
    }
};




// create tour enpoint 
export const createTourMethod = async (req, res) => {
    console.log(req.body);
    const { name, typeoftours_id, endplace, title, day_number, night_number, image , startplace} = req.body;

    // Validate required fields
    if (!name || !typeoftours_id || !endplace || !title || !day_number || !night_number || !image || !startplace) {
        return res.status(400).json({ state: false, message: 'All fields are required' });
    }

    // Create user instance
    const tour = new tourModel({name, typeoftours_id, endplace, title, day_number, night_number, image, startplace });

    try {
        // Register user using auth service
        const response = await createTour(tour);
        if (response.state) {
            return res.status(201).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.error('Error in user registration:', error);
        return res.status(500).json({ 
            state: false, 
            message: 'create tour failed. Please try again later.' 
        });
    }
};

export const createDetailTourMethod = async (req,res) =>{
  try{
    console.log(req.body);
    const {startday,endday,description,numerseatunoccupied,transportertourid,price,tour_id} = req.body;
    if(!startday || !endday || !description  || !numerseatunoccupied || !transportertourid || !price || !tour_id ){
        return res.status(400).json({State : false, message :'All fields are required'});
    }
    const detailtour = new detailtourModel({startday,endday,description,numerseatunoccupied,transportertourid,price,tour_id});
    const response = await createDetailTour(detailtour);
    if(response.state == false){
        return res.status(400).json(response);
    }
    return res.status(201).json(response);
  } catch(error){
    console.error('Error in create detail tour:', error);
    return res.status(500).json({status : false , message : 'create detailtour failed'});
  }
    
}

// get all tour enpoint
export const getAllDetailTourMethod =  async (req, res) => {
    try {
        // get id form url
        const { id }  = req.params;
        console.log(id);
        // Register user using auth service
        const response = await getAllDetailTourByTourId(id);
        if (response.state) {
            return res.status(201).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.error('Error in getAllDetailTourMethod :', error);
        return res.status(500).json({ 
            state: false, 
            message: 'get All detail tour failed. Please try again later.' 
        });
    }
};