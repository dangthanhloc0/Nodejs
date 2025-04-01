import { pool } from '../../config/db.js';

export const getAllTrans = async () => {
  try {
    const query = `SELECT * FROM transportertours`; // Truy vấn bảng typeoftours
    const [types] = await pool.query(query);

    if (!types || types.length === 0) {
      return { state: false, message: "Không tìm thấy loại transport nào", data: [] };
    }

    return { state: true, message: "Lấy danh sách loại transporttours thành công", data: types };
  } catch (error) {
    console.error("Lỗi khi lấy danh sách loại :", error);
    return { state: false, message: "Lỗi hệ thống khi lấy list transport. Vui lòng thử lại sau." };
  }
};