import { useState } from "react";
import { motion } from "framer-motion";

export default function About() {
    const features = [
        {
            title: "Tìm Kiếm Tour",
            description: "Dễ dàng tìm kiếm và lọc các tour du lịch theo địa điểm, giá cả, thời gian để tìm được chuyến đi phù hợp nhất.",
            icon: (
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            )
        },
        {
            title: "Đặt Tour Trực Tuyến",
            description: "Đặt tour nhanh chóng với quy trình thanh toán đơn giản, an toàn và bảo mật thông tin khách hàng.",
            icon: (
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "Thông Tin Chi Tiết",
            description: "Xem đầy đủ thông tin về lịch trình, điểm đến, dịch vụ đi kèm và đánh giá từ khách hàng trước.",
            icon: (
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    const stats = [
        { number: "1000+", label: "Tours" },
        { number: "50+", label: "Điểm Đến" },
        { number: "10K+", label: "Khách Hàng" },
        { number: "4.8/5", label: "Đánh Giá" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <motion.div 
                className="relative h-[500px] bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80')`
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <motion.h1 
                        className="text-5xl md:text-6xl font-bold mb-6 text-center"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Khám Phá Thế Giới Cùng Chúng Tôi
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl text-center max-w-2xl px-4"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Đồng hành cùng bạn trong mọi hành trình khám phá những điểm đến tuyệt vời
                    </motion.p>
                </div>
            </motion.div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={`stat-${stat.label}`}
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <motion.div 
                                className="text-4xl font-bold text-blue-600"
                                whileInView={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {stat.number}
                            </motion.div>
                            <div className="text-gray-600 mt-2">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <motion.h2 
                    className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Tính Năng Nổi Bật
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <motion.div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-4xl mx-auto text-center text-white">
                    <motion.h3 
                        className="text-3xl md:text-4xl font-bold mb-6"
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Sẵn Sàng Cho Chuyến Đi Tiếp Theo?
                    </motion.h3>
                    <motion.p 
                        className="text-xl mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Khám phá ngay các tour du lịch hấp dẫn và đặt chỗ ngay hôm nay
                    </motion.p>
                    <motion.button 
                        className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Khám Phá Ngay
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
