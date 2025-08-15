import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Home as HomeIcon } from 'lucide-react';
import PropertyCard from '../components/PropertyCard.jsx';

const Home = ({ properties, onSelectProperty, favorites, onToggleFavorite }) => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalSales: 0,
    happyClients: 0
  });

  useEffect(() => {
    // Get featured properties (first 3)
    setFeaturedProperties(properties.slice(0, 3));
    
    // Set stats based on actual data
    setStats({
      totalProperties: properties.length,
      totalSales: Math.floor(properties.length * 0.7),
      happyClients: Math.floor(properties.length * 2)
    });
  }, [properties]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      className="home-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Luxury Home"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container">
          <motion.div 
            className="hero-content"
            variants={itemVariants}
          >
            <h1 className="hero-title">
              Find Your
              <span className="gradient-text"> Dream Home</span>
            </h1>
            <p className="hero-description">
              Discover luxury properties with cutting-edge technology and personalized service. 
              Your perfect home is just a click away.
            </p>
            
            <div className="hero-actions">
              <Link to="/properties" className="btn btn-primary">
                Explore Properties
                <ArrowRight size={20} />
              </Link>
              <Link to="/analytics" className="btn btn-secondary">
                Market Insights
              </Link>
            </div>

            <div className="hero-stats">
              <motion.div 
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="stat-number">{stats.totalProperties.toLocaleString()}+</div>
                <div className="stat-label">Properties</div>
              </motion.div>
              
              <motion.div 
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <div className="stat-number">{stats.totalSales.toLocaleString()}+</div>
                <div className="stat-label">Sales Completed</div>
              </motion.div>
              
              <motion.div 
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="stat-number">{stats.happyClients.toLocaleString()}+</div>
                <div className="stat-label">Happy Clients</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-header"
            variants={itemVariants}
          >
            <h2 className="section-title">Why Choose EstateVision</h2>
            <p className="section-description">
              Experience the future of real estate with our innovative platform
            </p>
          </motion.div>

          <div className="features-grid">
            <motion.div 
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon">
                <TrendingUp size={32} />
              </div>
              <h3 className="feature-title">Market Analytics</h3>
              <p className="feature-description">
                Advanced data visualization and market trends to make informed decisions
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3 className="feature-title">Expert Agents</h3>
              <p className="feature-description">
                Connect with certified real estate professionals for personalized service
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon">
                <HomeIcon size={32} />
              </div>
              <h3 className="feature-title">Premium Properties</h3>
              <p className="feature-description">
                Curated selection of luxury homes and investment opportunities
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-section">
        <div className="container">
          <motion.div 
            className="section-header"
            variants={itemVariants}
          >
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-description">
              Handpicked properties that represent the best of luxury living
            </p>
          </motion.div>

          <div className="properties-grid">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                variants={itemVariants}
                custom={index}
              >
                <PropertyCard
                  property={property}
                  onSelect={onSelectProperty}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="section-footer"
            variants={itemVariants}
          >
            <Link to="/properties" className="btn btn-primary">
              View All Properties
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .home-page {
          min-height: 100vh;
        }

        .hero-section {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.8) 0%,
            rgba(118, 75, 162, 0.6) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: white;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          opacity: 0.95;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: flex;
          gap: 3rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .features-section {
          padding: 5rem 0;
          background: var(--background-white);
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .section-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 2.5rem 1.5rem;
          background: var(--background-white);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-light);
          transition: var(--transition);
        }

        .feature-card:hover {
          box-shadow: var(--shadow-large);
        }

        .feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: var(--primary-gradient);
          border-radius: 50%;
          color: white;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .feature-description {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .featured-section {
          padding: 5rem 0;
          background: var(--background-light);
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .section-footer {
          text-align: center;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description {
            font-size: 1.1rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .hero-stats {
            gap: 1.5rem;
          }

          .stat-number {
            font-size: 2rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .properties-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Home;