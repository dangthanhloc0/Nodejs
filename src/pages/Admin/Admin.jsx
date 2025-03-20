import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import axios from 'axios';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('tours');
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTour, setCurrentTour] = useState(null);
  
  // Form state for creating/editing tour
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    image: '',
    status: 'active'
  });

  // Fetch tours on component mount
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.get('http://localhost:3000/api/tours');
      setTours(response.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openCreateModal = () => {
    setFormData({
      title: '',
      location: '',
      price: '',
      description: '',
      image: '',
      status: 'active'
    });
    setShowCreateModal(true);
  };

  const openEditModal = (tour) => {
    setCurrentTour(tour);
    setFormData({
      title: tour.title,
      location: tour.location,
      price: tour.price,
      description: tour.description || '',
      image: tour.image,
      status: tour.status || 'active'
    });
    setShowEditModal(true);
  };

  const handleCreateTour = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      await axios.post('http://localhost:3000/api/tours', formData);
      setShowCreateModal(false);
      fetchTours();
    } catch (error) {
      console.error('Error creating tour:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTour = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      await axios.put(`http://localhost:3000/api/tours/${currentTour.id}`, formData);
      setShowEditModal(false);
      fetchTours();
    } catch (error) {
      console.error('Error updating tour:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTour = async (tourId) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      setLoading(true);
      try {
        // Replace with your actual API endpoint
        await axios.delete(`http://localhost:3000/api/tours/${tourId}`);
        fetchTours();
      } catch (error) {
        console.error('Error deleting tour:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleTourStatus = async (tour) => {
    const newStatus = tour.status === 'active' ? 'inactive' : 'active';
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      await axios.patch(`http://localhost:3000/api/tours/${tour.id}/status`, {
        status: newStatus
      });
      fetchTours();
    } catch (error) {
      console.error('Error toggling tour status:', error);
    } finally {
      setLoading(false);
    }
  };

  // Modal components
  const CreateTourModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Tạo Tour Mới</h2>
        <form onSubmit={handleCreateTour}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Tên Tour</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Địa điểm</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Giá</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                rows="3"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">URL Hình ảnh</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Trạng thái</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="active">Hiển thị</option>
                <option value="inactive">Ẩn</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setShowCreateModal(false)}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaPlus className="mr-2" />}
              Tạo mới
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  const EditTourModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Chỉnh sửa Tour</h2>
        <form onSubmit={handleUpdateTour}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Tên Tour</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Địa điểm</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Giá</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                rows="3"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">URL Hình ảnh</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Trạng thái</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="active">Hiển thị</option>
                <option value="inactive">Ẩn</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setShowEditModal(false)}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaEdit className="mr-2" />}
              Cập nhật
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-lg ${activeTab === 'tours' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveTab('tours')}
              >
                Quản lý Tour
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveTab('users')}
              >
                Quản lý User
              </button>
            </div>
          </div>

          {/* Tours Management */}
          {activeTab === 'tours' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Danh sách Tour</h2>
                <button 
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={openCreateModal}
                >
                  <FaPlus className="mr-2" /> Tạo Tour mới
                </button>
              </div>

              {loading && !tours.length ? (
                <div className="flex justify-center py-12">
                  <FaSpinner className="animate-spin text-blue-600 text-4xl" />
                </div>
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hình ảnh</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thông tin Tour</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tours.map((tour) => (
                        <motion.tr 
                          key={tour.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-16 w-24 rounded-md overflow-hidden bg-gray-100">
                              <img 
                                src={tour.image} 
                                alt={tour.title} 
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                }}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{tour.title}</div>
                            <div className="text-sm text-gray-500">{tour.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-semibold">{tour.price}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              tour.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {tour.status === 'active' ? 'Hiển thị' : 'Ẩn'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleToggleTourStatus(tour)}
                                className={`p-1 rounded ${
                                  tour.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                                }`}
                                title={tour.status === 'active' ? 'Ẩn tour' : 'Hiển thị tour'}
                              >
                                {tour.status === 'active' ? <FaEyeSlash /> : <FaEye />}
                              </button>
                              <button
                                onClick={() => openEditModal(tour)}
                                className="p-1 text-indigo-600 hover:text-indigo-900"
                                title="Chỉnh sửa"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteTour(tour.id)}
                                className="p-1 text-red-600 hover:text-red-900"
                                title="Xóa"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                      
                      {!loading && tours.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                            Chưa có tour nào. Hãy tạo tour mới!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* Users Management - placeholder for future implementation */}
          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Quản lý Users</h2>
              <p className="text-gray-600">Tính năng đang được phát triển...</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateTourModal />}
      {showEditModal && <EditTourModal />}
    </div>
  );
}
