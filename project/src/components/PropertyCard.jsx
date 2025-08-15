import { motion } from 'framer-motion';
import { Heart, MapPin, Bed, Bath, Square, Eye } from 'lucide-react';

const PropertyCard = ({ property, onSelect, isFavorite, onToggleFavorite }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      className="property-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(property)}
    >
      <div className="property-image-container">
        {property.images && property.images.length > 0 && (
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="property-image"
          />
        )}
        <div className="property-overlay">
          <motion.button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={18} fill={isFavorite ? '#ef4444' : 'none'} />
          </motion.button>
          
          <motion.button
            className="view-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={18} />
            View Details
          </motion.button>
        </div>
        
        <div className="property-badge">
          <span className={`status-badge ${property.status.toLowerCase().replace(' ', '-')}`}>
            {property.status}
          </span>
        </div>
      </div>

      <div className="property-content">
        <div className="property-price">
          {formatPrice(property.price)}
          {property.status === 'For Rent' && <span className="rent-period">/month</span>}
        </div>
        
        <h3 className="property-title">{property.title}</h3>
        
        <div className="property-location">
          <MapPin size={16} />
          {property.location}
        </div>

        <div className="property-features">
          <div className="feature">
            <Bed size={16} />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="feature">
            <Bath size={16} />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="feature">
            <Square size={16} />
            <span>{property.area.toLocaleString()} sqft</span>
          </div>
        </div>

        <div className="property-type">
          {property.type}
        </div>
      </div>

      <style jsx>{`
        .property-card {
          background: var(--background-white);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-light);
          cursor: pointer;
          transition: var(--transition);
          position: relative;
        }

        .property-card:hover {
          box-shadow: var(--shadow-large);
        }

        .property-image-container {
          position: relative;
          height: 240px;
          overflow: hidden;
          background: #f5f7fa;
        }

        .property-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .property-card:hover .property-image {
          transform: scale(1.05);
        }

        .property-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
        }

        .property-card:hover .property-overlay {
          opacity: 1;
        }

        .favorite-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          color: #666;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          opacity: 1;
        }

        .favorite-btn.active {
          color: #ef4444;
          background: rgba(255, 255, 255, 1);
        }

        .view-btn {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: var(--border-radius);
          padding: 0.75rem 1.5rem;
          color: var(--text-primary);
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }

        .view-btn:hover {
          background: white;
          transform: translateY(-2px);
        }

        .property-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
        }

        .status-badge {
          background: var(--primary-gradient);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: var(--border-radius);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge.for-rent {
          background: var(--secondary-gradient);
        }

        .property-content {
          padding: 1.5rem;
        }

        .property-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .rent-period {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .property-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .property-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .property-features {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        .property-type {
          display: inline-block;
          background: var(--background-light);
          color: var(--text-secondary);
          padding: 0.25rem 0.75rem;
          border-radius: var(--border-radius);
          font-size: 0.8rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .property-features {
            gap: 0.75rem;
          }
          
          .property-price {
            font-size: 1.25rem;
          }
          
          .property-content {
            padding: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default PropertyCard;