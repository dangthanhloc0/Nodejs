import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Main() {
  const [search, setSearch] = useState("");

  const tours = [
    {
      id: 1,
      title: "Paradise Beach Resort",
      location: "Maldives",
      price: "$1,299",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
    },
    {
      id: 2,
      title: "Mountain Adventure Trek",
      location: "Swiss Alps",
      price: "$899",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
    },
    {
      id: 3,
      title: "Cultural Heritage Tour",
      location: "Kyoto, Japan",
      price: "$1,099",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <motion.header 
        className="relative w-full h-[600px] bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80')`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-black opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        />
        
        <motion.h2 
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 drop-shadow-2xl relative z-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        >
          Khám Phá Thế Giới 
        </motion.h2>
        
        <motion.p 
          className="mt-4 text-xl text-blue-100 drop-shadow-lg relative z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Bắt đầu hành trình của bạn chỉ với cú Clicks!
        </motion.p>

        <motion.div 
          className="mt-8 flex gap-2 bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-2xl relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <input
            type="text"
            placeholder="Where do you want to go?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-4 rounded-lg bg-white/80 backdrop-blur-sm text-gray-800 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          <motion.button 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 rounded-lg text-white font-semibold hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore
          </motion.button>
        </motion.div>
      </motion.header>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.h3 
          className="text-4xl font-bold text-gray-800 text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Featured Destinations
        </motion.h3>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, staggerChildren: 0.2 }}
        >
          {tours.map((tour, index) => (
            <motion.div 
              key={tour.id}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800">{tour.title}</h4>
                <p className="text-gray-600 mt-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {tour.location}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">{tour.price}</span>
                  <motion.button 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
