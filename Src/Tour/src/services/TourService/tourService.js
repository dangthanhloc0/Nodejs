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


// Lấy danh sách tất cả detailtours kèm thông tin của tour
export const getAllDetailTourByTourId = async (tourId) => {
    try {
        const query = `
            SELECT 
                dt.*, 
                t.name AS tour_name, 
                t.typeoftours_id, 
                t.startplace, 
                t.endplace, 
                t.title, 
                t.day_number, 
                t.night_number, 
                t.image
            FROM detailtours dt
            JOIN tours t ON dt.tour_id = t.id
            WHERE dt.tour_id = ?;
        `;
        const values = [tourId];
        const [detailTourList] = await pool.query(query, values);

        if (detailTourList.length === 0) {
            return { state: false, message: 'No detail tours found for this tour ID' };
        }

        return {
            state: true,
            message: 'Get all detail tours successfully',
            data: {
                tour: {
                    id: tourId,
                    name: detailTourList[0].tour_name,
                    typeoftours_id: detailTourList[0].typeoftours_id,
                    startplace: detailTourList[0].startplace,
                    endplace: detailTourList[0].endplace,
                    title: detailTourList[0].title,
                    day_number: detailTourList[0].day_number,
                    night_number: detailTourList[0].night_number,
                    image: detailTourList[0].image,
                },
                detailTours: detailTourList.map(detail => ({
                    id: detail.id,
                    startday: detail.startday,
                    endday: detail.endday,
                    description: detail.description,
                    numberpeoplebooked: detail.numberpeoplebooked,
                    numerseatunoccupied: detail.numerseatunoccupied,
                    transportertourid: detail.transportertourid,
                    price: detail.price,
                    created_at: detail.created_at
                }))
            }
        };
    } catch (error) {
        console.error('Error fetching getAllDetailTourByTourId:', error);
        return { state: false, message: 'Get all detail tours failed' };
    }
};
