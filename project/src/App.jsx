import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';
import Analytics from './pages/Analytics.jsx';
import PropertyDetails from './components/PropertyDetails.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import './styles/global.css';

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [propertyData, setPropertyData] = useState([]);
  const [error, setError] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check for valid admin token
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Verify token validity
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setIsAdminAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
        }
      // eslint-disable-next-line no-unused-vars
      } catch (e) {
        localStorage.removeItem('adminToken');
      }
    }

    // Fetch property data from Flask backend
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/properties");
        
        const formattedData = response.data.properties.map(property => ({
          ...property,
          images: property.images,
          amenities: Array.isArray(property.amenities) 
            ? property.amenities 
            : (property.amenities || '').split(',')
        }));
        
        setPropertyData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load property data. Please try again later.");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleAdminLogin = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div
          className="loading-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-logo">
            <motion.div
              className="logo-icon"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              🏡
            </motion.div>
            <h2>EstateVision</h2>
          </div>
          <motion.div
            className="loading-bar"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <div className="error-content">
          <h2>⚠️ Data Loading Error</h2>
          <p>{error}</p>
          <button 
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Header 
          isAdmin={isAdminAuthenticated} 
          onAdminLogout={handleAdminLogout} 
        />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    properties={propertyData.slice(0, 3)}
                    onSelectProperty={setSelectedProperty}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                  />
                }
              />
              <Route
                path="/properties"
                element={
                  <Properties
                    properties={propertyData}
                    onSelectProperty={setSelectedProperty}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                  />
                }
              />
              <Route path="/analytics" element={<Analytics />} />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/login" 
                element={
                  isAdminAuthenticated ? 
                    <Navigate to="/admin/dashboard" replace /> : 
                    <AdminLogin onLoginSuccess={handleAdminLogin} />
                } 
              />
              <Route 
                path="/admin/dashboard" 
                element={
                  isAdminAuthenticated ? 
                    <AdminDashboard /> : 
                    <Navigate to="/admin/login" replace />
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />

        <AnimatePresence>
          {selectedProperty && (
            <PropertyDetails
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
              isFavorite={favorites.includes(selectedProperty.id)}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;