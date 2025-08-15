import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard.jsx';
import Filters from '../components/Filters.jsx';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

const Properties = ({ properties, onSelectProperty, favorites, onToggleFavorite }) => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('price-low');
  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    status: 'All',
    priceRange: { label: 'All Prices', min: 0, max: Infinity },
    bedrooms: 0,
    bathrooms: 0
  });

  useEffect(() => {
    let filtered = [...properties];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        property.type.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter
    if (filters.type !== 'All') {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    // Apply status filter
    if (filters.status !== 'All') {
      filtered = filtered.filter(property => property.status === filters.status);
    }

    // Apply price range filter
    if (filters.priceRange.min > 0 || filters.priceRange.max < Infinity) {
      filtered = filtered.filter(property => 
        property.price >= filters.priceRange.min && 
        property.price <= filters.priceRange.max
      );
    }

    // Apply bedrooms filter
    if (filters.bedrooms > 0) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms);
    }

    // Apply bathrooms filter
    if (filters.bathrooms > 0) {
      filtered = filtered.filter(property => property.bathrooms >= filters.bathrooms);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'size-large':
          return b.area - a.area;
        case 'size-small':
          return a.area - b.area;
        default:
          return 0;
      }
    });

    setFilteredProperties(filtered);
  }, [filters, sortBy, properties]);

  const sortOptions = [
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'size-large', label: 'Largest First' },
    { value: 'size-small', label: 'Smallest First' }
  ];

  return (
    <motion.div 
      className="properties-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">All Properties</h1>
          <p className="page-description">
            Discover your perfect home from our curated collection of premium properties
          </p>
        </motion.div>

        <Filters filters={filters} onFilterChange={setFilters} />

        <motion.div 
          className="properties-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="results-info">
            <span className="results-count">
              {filteredProperties.length} properties found
            </span>
          </div>

          <div className="controls-group">
            <div className="sort-controls">
              <SlidersHorizontal size={18} />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="view-controls">
              <motion.button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid size={18} />
              </motion.button>
              <motion.button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={`properties-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}
          layout
        >
          {filteredProperties.length === 0 ? (
            <motion.div 
              className="no-results"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="no-results-icon">🏠</div>
              <h3>No properties found</h3>
              <p>Try adjusting your filters to see more results</p>
            </motion.div>
          ) : (
            filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="property-item"
              >
                <PropertyCard
                  property={property}
                  onSelect={onSelectProperty}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      <style jsx>{`
        .properties-page {
          min-height: 100vh;
          padding: 2rem 0;
          background: var(--background-light);
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .page-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .properties-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: var(--background-white);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-light);
        }

        .results-info {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .results-count {
          font-size: 1rem;
        }

        .controls-group {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .sort-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
        }

        .sort-select {
          padding: 0.5rem 1rem;
          border: 2px solid var(--border-light);
          border-radius: var(--border-radius);
          background: white;
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition);
        }

        .sort-select:focus {
          outline: none;
          border-color: #667eea;
        }

        .view-controls {
          display: flex;
          gap: 0.5rem;
          background: var(--background-light);
          padding: 0.25rem;
          border-radius: var(--border-radius);
        }

        .view-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: var(--border-radius);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition);
        }

        .view-btn:hover {
          background: var(--background-white);
          color: var(--text-primary);
        }

        .view-btn.active {
          background: var(--background-white);
          color: #667eea;
          box-shadow: var(--shadow-light);
        }

        .properties-container.grid-view {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .properties-container.list-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .properties-container.list-view .property-item {
          max-width: none;
        }

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
          background: var(--background-white);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-light);
        }

        .no-results-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .no-results h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .no-results p {
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
          }

          .properties-controls {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .controls-group {
            justify-content: space-between;
          }

          .properties-container.grid-view {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .sort-controls {
            flex: 1;
          }

          .sort-select {
            flex: 1;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Properties;