import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { FaRegCalendarAlt, FaSignInAlt, FaUserPlus, FaSearch, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";

export default function Header() {
  return (
    <div className="fixed w-full z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href="tel:+1234567890" className="flex items-center hover:text-yellow-300 transition-colors">
              <FaPhone className="mr-2" />
              <span>+1 234 567 890</span>
            </a>
            <a href="#" className="flex items-center hover:text-yellow-300 transition-colors">
              <FaMapMarkerAlt className="mr-2" />
              <span>Địa Điểm</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-yellow-300 transition-colors">Hỗ Trợ</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">Liên Hệ</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav 
        className="bg-white text-gray-800 py-4 px-6 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <NavLink to="/" className="flex items-center space-x-2">
              <FaRegCalendarAlt className="text-blue-600 text-3xl" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TourBooking
              </span>
            </NavLink>
          </motion.div>

          {/* Main Menu */}
          <div className="flex items-center space-x-8">
            {[
              { path: "/", label: "Trang Chủ", icon: null },
              { path: "/tours", label: "Tours", icon: <FaRegCalendarAlt /> },
              { path: "/search", label: "Tìm Kiếm", icon: <FaSearch /> },
              { path: "/about", label: "Giới Thiệu", icon: <IoMdHelpCircleOutline /> }
            ].map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => 
                    `flex items-center space-x-1 text-base font-medium transition duration-300 
                    ${isActive 
                      ? "text-blue-600 border-b-2 border-blue-600" 
                      : "hover:text-blue-600"}`
                  }
                >
                  {link.icon && <span className="text-lg">{link.icon}</span>}
                  <span>{link.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink 
                to="/login" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <FaSignInAlt className="text-lg" />
                <span>Đăng Nhập</span>
              </NavLink>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink 
                to="/register" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <FaUserPlus className="text-lg" />
                <span>Đăng Ký</span>
              </NavLink>
            </motion.div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}