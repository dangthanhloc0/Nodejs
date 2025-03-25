import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axiosConfig';

const Visit = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/tour/get-all-tour");
        console.log("Tours data:", response.data.data);
        setTours(response.data.data || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching tours:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTours = tours.filter(tour =>
    tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const heroSlides = [
    {
      image: "https://d3lc2v4pocabbd.cloudfront.net/wp-content/uploads/2021/07/travel-2081174_1280.jpg",
      title: "Khám Phá Việt Nam",
      subtitle: "Những địa điểm tuyệt đẹp đang chờ đón bạn"
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdE5jC4TrsxtwSEEsv-JFjlnrrNUcVfSe8PFaBUuwWEqOCpwcHIS1dh_oZtsBgA7P00z8&usqp=CAU",
      title: "Du Lịch Nghỉ Dưỡng",
      subtitle: "Tận hưởng kỳ nghỉ tuyệt vời cùng gia đình"
    },
    {
      image: "https://www.technoheaven.net/Theme/img/Tour-Booking-Software.jpg",
      title: "Trải Nghiệm Văn Hóa",
      subtitle: "Khám phá văn hóa độc đáo các vùng miền"
    }
  ];

  const handleViewDetail = (tourId) => {
    console.log("Clicked tour ID:", tourId);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { 
        state: { from: `/tour/${tourId}` } 
      });
      return;
    }
    navigate(`/tour/${tourId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <div className="relative h-[80vh]">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full w-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div 
                className="relative h-full w-full bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30">
                  <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start text-left max-w-7xl">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1 }}
                      className="max-w-2xl"
                    >
                      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl text-white mb-8">
                        {slide.subtitle}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300"
                      >
                        Khám Phá Ngay
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Tìm kiếm tour..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 min-h-[400px] flex items-center justify-center">
            <p>Có lỗi xảy ra: {error}</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-8 text-center">Tour Nổi Bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour, index) => (
                <motion.div
                  key={tour.id || tour._id || index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative">
                    <img 
                      src={tour.image} 
                      alt={tour.name}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      Hot Deal
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{tour.name}</h3>
                    <p className="text-gray-600 mb-4">{tour.title}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-500">
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        <span>{tour.startplace} → {tour.endplace}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaClock className="mr-2 text-blue-500" />
                        <span>{tour.day_number} ngày {tour.night_number} đêm</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        <span>Khởi hành: Hàng ngày</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        console.log("Tour data:", tour);
                        console.log("Tour ID being used:", tour.id || tour._id);
                        handleViewDetail(tour.id || tour._id);
                      }}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors duration-300"
                    >
                      Xem Chi Tiết
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Visit;