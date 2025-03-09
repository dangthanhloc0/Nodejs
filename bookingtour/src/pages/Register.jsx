import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaFacebookF, FaGoogle, FaPlane } from "react-icons/fa";
import { MdBeachAccess } from "react-icons/md";

export default function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }
        console.log("Email:", email, "Password:", password);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Animated background elements */}
            <motion.div 
                className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-500 opacity-10"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div 
                className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500 opacity-10"
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -180, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Floating Icons */}
            <motion.div
                className="absolute top-[20%] right-[10%] text-blue-400 opacity-20"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <FaPlane className="text-6xl" />
            </motion.div>
            <motion.div
                className="absolute bottom-[30%] left-[5%] text-indigo-400 opacity-20"
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -10, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <MdBeachAccess className="text-7xl" />
            </motion.div>

            <div className="min-h-screen flex items-center justify-center px-4 py-8">
                <motion.div 
                    className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" />
                    
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Bắt Đầu Hành Trình
                        </h2>
                        <p className="text-gray-600 mt-2">Đăng ký để khám phá những điểm đến tuyệt vời</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text"
                                    placeholder="Tên người dùng"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm" 
                                    value={username} 
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </motion.div>

                        <motion.button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Đăng Ký Ngay
                        </motion.button>

                        <motion.div
                            className="relative my-6 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <span className="px-2 bg-white text-gray-500 relative z-10">
                                Hoặc đăng ký với
                            </span>
                            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-1" />
                        </motion.div>

                        <motion.div 
                            className="grid grid-cols-2 gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <motion.button
                                type="button"
                                className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaGoogle className="text-red-500" />
                                <span>Google</span>
                            </motion.button>
                            <motion.button
                                type="button"
                                className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaFacebookF className="text-blue-600" />
                                <span>Facebook</span>
                            </motion.button>
                        </motion.div>

                        <motion.p 
                            className="text-center text-gray-600 mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            Đã có tài khoản? 
                            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                                Đăng nhập
                            </a>
                        </motion.p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
