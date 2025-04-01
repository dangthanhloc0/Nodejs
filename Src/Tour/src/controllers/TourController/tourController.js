import tourModel from '../../models/tourModel.js';
import detailtourModel from '../../models/detailtourModel.js';
import { getAllTour, createTour ,createDetailTour ,getAllDetailTourByTourId, getListTours } from '../../services/TourService/tourService.js';


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
    const { name, typeoftours_id, endplace, title, day_number, image , startplace} = req.body;


    if (!name || !typeoftours_id || !endplace || !title || !day_number || !image || !startplace) {
        return res.status(400).json({ state: false, message: 'All fields are required' });
    }

    const night_number = day_number -1;
    const tour = new tourModel({name, typeoftours_id, endplace, title, day_number, night_number, image, startplace });

    try {
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
    
};

// API GET all detail tours của một tour
export const getAllDetailTourMethod = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Tour ID:", id);

        const response = await getAllDetailTourByTourId(id);
        if (response.state) {
            return res.status(200).json(response);
        } else {
            return res.status(404).json(response);
        }
    } catch (error) {
        console.error('Error in getAllDetailTourMethod:', error);
        return res.status(500).json({
            state: false,
            message: 'Get all detail tour failed. Please try again later.'
        });
    }
};


//Get List Tours
export const getListToursController = async (req, res) => {
    try {
      const result = await getListTours();
      return res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi tại getListToursController:", error);
      return res.status(500).json({
        state: false,
        message: "Lỗi hệ thống. Vui lòng thử lại sau.",
      });
    }
  };