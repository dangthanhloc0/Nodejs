import {createOrder} from '../../services/OrderService/orderService.js';
import ordertourModel from '../../models/ordertourModel.js';
export const CreateOrderMethod = async(req, res) => {
    try{
        const {typeoforderid,user_id,numberpeople,totalprice,detailtour_id} = req.body;
        if(!typeoforderid || !user_id || !numberpeople || !totalprice || !detailtour_id)  {
            return res.status(400).json({message: "All fields are required"});   
        }
        const order = new ordertourModel({typeoforderid,user_id,numberpeople,totalprice,detailtour_id});
        const response = await createOrder(order);
        if (response.success) {
            return res.status(201).json(response);
        } else {
            return res.status(400).json(response);
        }
    }catch(error){
        console.log('error in CreateOrderMethod : error: ', error);
        return res.status(500).json({status:false,message :'create order failed'});
    }
}