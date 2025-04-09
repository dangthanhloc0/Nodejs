import { pool } from '../../config/db.js';

export const getAllType = async () => {
  try {
    const query = `SELECT * FROM typeoftours`; // Truy vấn bảng typeoftours
    const [types] = await pool.query(query);

    if (!types || types.length === 0) {
      return { state: false, message: "Không tìm thấy loại tour nào", data: [] };
    }

    return { state: true, message: "Lấy danh sách loại tour thành công", data: types };
  } catch (error) {
    console.error("Lỗi khi lấy danh sách loại tour:", error);
    return { state: false, message: "Lỗi hệ thống khi lấy loại tour. Vui lòng thử lại sau." };
  }
};