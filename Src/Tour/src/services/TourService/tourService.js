import { pool } from "../../config/db.js";


// get all tour 
export const getAllTour = async () => {
    try {
        const query = `SELECT * ,tt.name as tyoftour_name
                       FROM tours t
                            JOIN typeoftours tt ON t.typeoftours_id = tt.id
                       `
        const [tours] = await pool.query(query);
        
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
        const query = `INSERT INTO tours (name, typeoftours_id, endplace, title, day_number, night_number, image,startplace ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [tour.name, tour.typeoftours_id, tour.endplace, tour.title,tour.day_number, tour.night_number, tour.image, tour.startplace];
        await pool.query(query, values);
        return {state : true,message :'create tour successfully'};
    } catch(error){
        console.error('error when fetching create tour ', error );
        return { state : false, message : 'Failed to create tour. Please handle problem ' + error, };
    }
}

//create detailt tour
export const createDetailTour = async (detailtour) => {
    try {
        if(detailtour.startday >= detailtour.endday) {
            return { state : false, message : 'Start day must be less than end day' };
        }
        const numberpeoplebooked = 0;
        const query = `INSERT INTO DetailTours (startday,endday,description,numberpeoplebooked,numerseatunoccupied,transportertourid,price,tour_id) VALUES(?,?,?,?,?,?,?,?)`
        const values = [detailtour.startday,detailtour.endday,detailtour.description,numberpeoplebooked,detailtour.numerseatunoccupied,detailtour.transportertourid,detailtour.price,detailtour.tour_id];
        await pool.query(query,values);
        return {state : true , message : 'create detail tour successfully'};
    } catch(error){
        console.error('error when fetching create tour ', error );
        return {state : false , messgae : 'create detail tour faild'}
    }
}


// get all detail tour
export const getAllDetailTourByTourId = async (tourId) => {
    try {
        const query = `SELECT * FROM DetailTours WHERE tour_id = ?`
        const values = [tourId];
        const [detailTourList] = await pool.query(query, values);
        return {state : true , message : 'Get all detail tour successfully' , data : detailTourList };
    } catch(error){
        console.error('error when fetching get all detail tour ', error );
        return {state : false , messgae : 'get all detail tour faild'}
    }
}
