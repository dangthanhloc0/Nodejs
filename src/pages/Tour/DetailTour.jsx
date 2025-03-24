import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DetailTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tourDetail, setTourDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          navigate("/login"); 
          return;
        }

        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/api/tour/get-All-DetailTour-By-TourId/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.state) {
          setTourDetail(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/login");
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourDetail();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {tourDetail && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-6">{tourDetail.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img 
                  src={tourDetail.image} 
                  alt={tourDetail.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <p className="text-xl font-semibold">Chi tiết tour:</p>
                <p>Ngày bắt đầu: {new Date(tourDetail.startday).toLocaleDateString()}</p>
                <p>Ngày kết thúc: {new Date(tourDetail.endday).toLocaleDateString()}</p>
                <p>Số chỗ còn trống: {tourDetail.numerseatunoccupied}</p>
                <p>Giá: {tourDetail.price.toLocaleString()} VND</p>
                <p className="text-gray-700">{tourDetail.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailTour;
