import jwt from 'jsonwebtoken';
const JWT_SECRET = '76348734687346874363443434343443333333333'; // Ensure this is set in your .env file
export const checkAdmin = (req, res, next) => {
    try {
        // Giả sử user đã đăng nhập và có thông tin user trong req.user
        const user = req.user;

        if (!user) {
            return res.status(401).json({ state: false, message: "Unauthorized. Please log in." });
        }

        if (user.userType !== "admin") {
            return res.status(403).json({ state: false, message: "Forbidden. Admin access required." });
        }

        // Nếu là admin, tiếp tục request
        next();
    } catch (error) {
        console.error("Error in checkAdmin middleware:", error);
        return res.status(500).json({ state: false, message: "Internal Server Error." });
    }
};



export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header

    if (!token) {
        return res.status(401).json({ state: false, message: "Unauthorized. No token provided." });
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET); // Giải mã token
        req.user = decoded; // Lưu thông tin user vào req
        next();
    } catch (error) {
        console.error("Error in authenticateUser middleware:", error);  
        return res.status(403).json({ state: false, message: "Invalid token." });
    }
};

