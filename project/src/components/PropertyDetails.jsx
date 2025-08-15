import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Heart, Share2, MapPin, Bed, Bath, Square, Calendar,
  Shield, Wifi, Car, Trees, Dumbbell, Camera
} from 'lucide-react';

const PropertyDetails = ({ property, onClose, isFavorite, onToggleFavorite }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  if (!property) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const amenityIcons = {
    'Swimming Pool': Trees,
    'Garage': Car,
    'Garden': Trees,
    'Security System': Shield,
    'Smart Home': Wifi,
    'City View': Camera,
    'Terrace': Trees,
    'Concierge': Shield,
    'Gym': Dumbbell,
    'Parking': Car,
    'Beach Access': Trees,
    'Deck': Trees,
    'Fireplace': Trees,
    'Ocean View': Camera,
    'High Ceilings': Trees,
    'Exposed Brick': Trees,
    'Modern Kitchen': Trees,
    'Rooftop Access': Trees,
    'Tennis Court': Dumbbell,
    'Large Garden': Trees,
    '3-Car Garage': Car,
    'Home Office': Wifi
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="property-details-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="property-details-modal"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <div className="header-actions">
              <motion.button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(property.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart size={20} fill={isFavorite ? '#ef4444' : 'none'} />
              </motion.button>
              
              <motion.button
                className="share-btn"
                onClick={handleShare}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 size={20} />
              </motion.button>
              
              <motion.button
                className="close-btn"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>
          </div>

          <div className="modal-content">
            {/* Image Gallery */}
            <div className="image-gallery">
              <div className="main-image">
                <img 
                  src={property.images[currentImageIndex]} 
                  alt={property.title}
                />
                <div className="image-counter">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>
              
              <div className="image-thumbnails">
                {property.images.map((image, index) => (
                  <motion.button
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={image} alt={`View ${index + 1}`} />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="property-info">
              <div className="property-header">
                <div className="price-section">
                  <div className="price">
                    {formatPrice(property.price)}
                    {property.status === 'For Rent' && <span className="rent-period">/month</span>}
                  </div>
                  <div className={`status-badge ${property.status.toLowerCase().replace(' ', '-')}`}>
                    {property.status}
                  </div>
                </div>
                
                <h2 className="property-title">{property.title}</h2>
                
                <div className="property-location">
                  <MapPin size={18} />
                  {property.location}
                </div>
              </div>

              <div className="property-features">
                <div className="feature">
                  <Bed size={20} />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="feature">
                  <Bath size={20} />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="feature">
                  <Square size={20} />
                  <span>{property.area.toLocaleString()} sqft</span>
                </div>
                <div className="feature">
                  <Calendar size={20} />
                  <span>Built in {property.yearBuilt}</span>
                </div>
              </div>

              <div className="property-description">
                <h3>Description</h3>
                <p>{property.description}</p>
              </div>

              <div className="property-amenities">
                <h3>Amenities</h3>
                <div className="amenities-grid">
                  {(property.amenities || []).slice(0, showAllAmenities ? undefined : 6).map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity] || Shield;
                    return (
                      <motion.div
                        key={index}
                        className="amenity-item"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <IconComponent size={18} />
                        <span>{amenity}</span>
                      </motion.div>
                    );
                  })}
                </div>
                
                {(property.amenities || []).length > 6 && (
                  <motion.button
                    className="show-more-btn"
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {showAllAmenities ? 'Show Less' : `Show ${property.amenities.length - 6} More`}
                  </motion.button>
                )}
              </div>

              <div className="agent-info">
                <h3>Contact Agent</h3>
                <div className="agent-card">
                  <div className="agent-avatar">
                    {property.agent?.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="agent-details">
                    <div className="agent-name">{property.agent?.name || 'Agent Name'}</div>
                    <div className="agent-contact">
                      <div>{property.agent?.phone || 'Contact Phone'}</div>
                      <div>{property.agent?.email || 'contact@email.com'}</div>
                    </div>
                  </div>
                  <motion.button
                    className="contact-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <style jsx>{`
          .property-details-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }

          .property-details-modal {
            background: var(--background-white);
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-large);
            max-width: 1000px;
            max-height: 90vh;
            width: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }

          .modal-header {
            padding: 1rem 1.5rem;
            border-bottom: 1px solid var(--border-light);
            display: flex;
            justify-content: flex-end;
          }

          .header-actions {
            display: flex;
            gap: 0.5rem;
          }

          .favorite-btn, .share-btn, .close-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 50%;
            background: var(--background-light);
            color: var(--text-secondary);
            cursor: pointer;
            transition: var(--transition);
          }

          .favorite-btn:hover, .share-btn:hover {
            background: rgba(102, 126, 234, 0.1);
            color: #667eea;
          }

          .favorite-btn.active {
            color: #ef4444;
            background: rgba(239, 68, 68, 0.1);
          }

          .close-btn:hover {
            background: rgba(239, 68, 68, 0.1);
            color: #ef4444;
          }

          .modal-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            flex: 1;
            overflow: hidden;
          }

          .image-gallery {
            display: flex;
            flex-direction: column;
            background: var(--background-light);
          }

          .main-image {
            flex: 1;
            position: relative;
            overflow: hidden;
          }

          .main-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .image-counter {
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: var(--border-radius);
            font-size: 0.85rem;
          }

          .image-thumbnails {
            display: flex;
            gap: 0.5rem;
            padding: 1rem;
            overflow-x: auto;
          }

          .thumbnail {
            flex-shrink: 0;
            width: 80px;
            height: 60px;
            border: 2px solid transparent;
            border-radius: var(--border-radius);
            overflow: hidden;
            cursor: pointer;
            transition: var(--transition);
          }

          .thumbnail.active {
            border-color: #667eea;
          }

          .thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .property-info {
            padding: 2rem;
            overflow-y: auto;
          }

          .property-header {
            margin-bottom: 2rem;
          }

          .price-section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
          }

          .price {
            font-size: 2rem;
            font-weight: 700;
            color: var(--text-primary);
            display: flex;
            align-items: baseline;
            gap: 0.5rem;
          }

          .rent-period {
            font-size: 1rem;
            color: var(--text-secondary);
            font-weight: 400;
          }

          .status-badge {
            padding: 0.5rem 1rem;
            border-radius: var(--border-radius);
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: var(--primary-gradient);
            color: white;
          }

          .status-badge.for-rent {
            background: var(--secondary-gradient);
          }

          .property-title {
            font-size: 1.75rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 1rem;
            line-height: 1.3;
          }

          .property-location {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-secondary);
            font-size: 1rem;
          }

          .property-features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: var(--background-light);
            border-radius: var(--border-radius);
          }

          .feature {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: var(--text-primary);
            font-weight: 500;
          }

          .property-description {
            margin-bottom: 2rem;
          }

          .property-description h3,
          .property-amenities h3,
          .agent-info h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 1rem;
          }

          .property-description p {
            color: var(--text-secondary);
            line-height: 1.7;
          }

          .amenities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .amenity-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: var(--background-light);
            border-radius: var(--border-radius);
            color: var(--text-primary);
            font-size: 0.9rem;
          }

          .show-more-btn {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid var(--border-light);
            border-radius: var(--border-radius);
            background: transparent;
            color: var(--text-primary);
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
          }

          .show-more-btn:hover {
            border-color: #667eea;
            background: rgba(102, 126, 234, 0.05);
          }

          .agent-info {
            margin-top: 2rem;
          }

          .agent-card {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.5rem;
            background: var(--background-light);
            border-radius: var(--border-radius);
          }

          .agent-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--primary-gradient);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 1.25rem;
          }

          .agent-details {
            flex: 1;
          }

          .agent-name {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
          }

          .agent-contact {
            color: var(--text-secondary);
            font-size: 0.9rem;
          }

          .contact-btn {
            padding: 0.75rem 1.5rem;
            background: var(--primary-gradient);
            color: white;
            border: none;
            border-radius: var(--border-radius);
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
          }

          .contact-btn:hover {
            transform: translateY(-1px);
            box-shadow: var(--shadow-medium);
          }

          @media (max-width: 768px) {
            .property-details-overlay {
              padding: 1rem;
            }

            .modal-content {
              grid-template-columns: 1fr;
            }

            .image-gallery {
              max-height: 300px;
            }

            .property-features {
              grid-template-columns: 1fr;
            }

            .amenities-grid {
              grid-template-columns: 1fr;
            }

            .agent-card {
              flex-direction: column;
              text-align: center;
            }

            .price {
              font-size: 1.5rem;
            }

            .property-title {
              font-size: 1.5rem;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyDetails;