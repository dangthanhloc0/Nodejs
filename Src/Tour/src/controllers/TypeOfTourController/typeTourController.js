import { getAllType } from '../../services/TypeOfTourService/typetourService.js';

export const getAll = async (req, res) => {
  try {
    const response = await getAllType();
    if (response.state) {
      return res.status(200).json(response); // Trả về 200 thay vì 201
    } else {
      return res.status(404).json(response); // Trả về 404 nếu không tìm thấy
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách loại tour:', error);
    return res.status(500).json({ 
      state: false, 
      message: 'Lấy danh sách loại tour thất bại. Vui lòng thử lại sau.' 
    });
  }
};