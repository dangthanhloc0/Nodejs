import {createOrder, getOrdersByUserId} from '../../services/OrderService/orderService.js';
import ordertourModel from '../../models/ordertourModel.js';
export const CreateOrderMethod = async(req, res) => {
    try{
        const {typeoforderid,user_id,numberpeople,totalprice,detailtour_id} = req.body;
        if(!typeoforderid || !user_id || !numberpeople || !totalprice || !detailtour_id)  {
            return res.status(400).json({message: "All fields are required"});   
        }
        const order = new ordertourModel({typeoforderid,user_id,numberpeople,totalprice,detailtour_id});
        const response = await createOrder(order);
        if (response.state) {
            return res.status(201).json(response);
        } else {
            return res.status(400).json(response);
        }
    }catch(error){
        console.log('error in CreateOrderMethod : error: ', error);
        return res.status(500).json({status:false,message :'create order failed'});
    }
}


export const getAllOrder = async (req, res) => {
  try {
    // Lấy user_id từ token
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(401).json({
        status: false,
        message: "Người dùng chưa được xác thực",
      });
    }

    // Gọi hàm getOrdersByUserId
    const orders = await getOrdersByUserId(user_id);

    return res.status(200).json({
      status: true,
      message: "Lấy danh sách order thành công",
      data: orders,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách order:", error.message);
    return res.status(500).json({
      status: false,
      message: "Lỗi hệ thống khi lấy danh sách order",
    });
  }
};