import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaUsers, FaDollarSign, FaInfoCircle } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosConfig';//cấu hình sẵn base Url 'http://localhost:3000/api'

const TourDetail = () => {
  const { id } = useParams();
  const [tourDetails, setTourDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDetailTour, setSelectedDetailTour] = useState(null);

  console.log("Tour ID from URL params:", id);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        setLoading(true);
        console.log("Fetching details for tour ID:", id);
        const response = await axiosInstance.get(`/tour/get-All-DetailTour-By-TourId/${id}`);
        console.log("Tour detail response:", response.data);
        
        if (response.data.state) {
          setTourDetails(response.data.data);
          // Mặc định chọn tour đầu tiên
          if (response.data.data.detailTours.length > 0) {
            setSelectedDetailTour(response.data.data.detailTours[0]);
          }
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error("Error fetching tour details:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTourDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {tourDetails && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          {/* Tour Header */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="relative h-96">
              <img 
                src={tourDetails.tour.image} 
                alt={tourDetails.tour.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 p-8 text-white">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold mb-4"
                  >
                    {tourDetails.tour.name}
                  </motion.h1>
                  <p className="text-xl opacity-90">{tourDetails.tour.title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tour Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Thông Tin Tour</h2>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaMapMarkerAlt className="text-blue-500 text-xl" />
                    <div>
                      <p className="text-sm font-medium">Điểm Khởi Hành</p>
                      <p className="text-lg">{tourDetails.tour.startplace}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaMapMarkerAlt className="text-red-500 text-xl" />
                    <div>
                      <p className="text-sm font-medium">Điểm Đến</p>
                      <p className="text-lg">{tourDetails.tour.endplace}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaClock className="text-green-500 text-xl" />
                    <div>
                      <p className="text-sm font-medium">Thời Gian</p>
                      <p className="text-lg">{tourDetails.tour.day_number} ngày {tourDetails.tour.night_number} đêm</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Available Tours Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Lịch Khởi Hành</h2>
                <div className="space-y-4">
                  {tourDetails.detailTours.map((detail) => (
                    <motion.div
                      key={detail.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedDetailTour?.id === detail.id
                          ? 'bg-blue-50 border-2 border-blue-500'
                          : 'border border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedDetailTour(detail)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="text-blue-500" />
                          <span className="font-medium">
                            {new Date(detail.startday).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="text-green-600 font-bold">
                          ${detail.price}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaUsers className="text-gray-400" />
                        <span>Còn {detail.numerseatunoccupied} chỗ trống</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Selected Tour Details */}
          {selectedDetailTour && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-semibold mb-6">Chi Tiết Lịch Trình</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">
                  {selectedDetailTour.description}
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-300"
              >
                Đặt Tour Này
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default TourDetail; 