import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Visit = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/api/tour/get-all-tour");
        setTours(response.data.data || []); // Assuming data is nested in response.data.data
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen mt-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen mt-20 text-red-500">
      <p>Có lỗi xảy ra: {error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-8">Khám Phá Tours</h1>
      
      {tours.length === 0 ? (
        <p className="text-center text-gray-500">Không có tour nào</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour, index) => (
            <motion.div
              key={tour._id || index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <img 
                src={tour.image} 
                alt={tour.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{tour.name}</h2>
                <p className="text-gray-600 mb-2">{tour.title}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{tour.startplace} → {tour.endplace}</span>
                  <span>{tour.day_number} ngày {tour.night_number} đêm</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Visit;