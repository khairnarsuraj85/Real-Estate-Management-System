import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

const Filters = ({ onFilterChange, filters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const propertyTypes = ['All', 'House', 'Condo', 'Villa', 'Loft', 'Penthouse', 'Estate'];
  const statusOptions = ['All', 'For Sale', 'For Rent'];
  const priceRanges = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under $500K', min: 0, max: 500000 },
    { label: '$500K - $1M', min: 500000, max: 1000000 },
    { label: '$1M - $2M', min: 1000000, max: 2000000 },
    { label: '$2M+', min: 2000000, max: Infinity }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleFilterChange('search', searchQuery);
  };

  const clearFilters = () => {
    setSearchQuery('');
    onFilterChange({
      search: '',
      type: 'All',
      status: 'All',
      priceRange: priceRanges[0],
      bedrooms: 0,
      bathrooms: 0
    });
  };

  const hasActiveFilters = filters.search || filters.type !== 'All' || 
    filters.status !== 'All' || filters.priceRange !== priceRanges[0] ||
    filters.bedrooms > 0 || filters.bathrooms > 0;

  return (
    <motion.div 
      className="filters-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="filters-header">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search properties, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <div className="filter-actions">
          <motion.button
            className={`filter-toggle ${isExpanded ? 'active' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter size={18} />
            Filters
            <ChevronDown size={16} className={`chevron ${isExpanded ? 'rotated' : ''}`} />
          </motion.button>

          {hasActiveFilters && (
            <motion.button
              className="clear-filters"
              onClick={clearFilters}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} />
              Clear
            </motion.button>
          )}
        </div>
      </div>

      <motion.div
        className={`filters-panel ${isExpanded ? 'expanded' : ''}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">Property Type</label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="filter-select"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="filter-select"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Price Range</label>
            <select
              value={priceRanges.findIndex(range => 
                range.min === filters.priceRange.min && 
                range.max === filters.priceRange.max
              )}
              onChange={(e) => handleFilterChange('priceRange', priceRanges[e.target.value])}
              className="filter-select"
            >
              {priceRanges.map((range, index) => (
                <option key={index} value={index}>{range.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Bedrooms</label>
            <select
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange('bedrooms', parseInt(e.target.value))}
              className="filter-select"
            >
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
              <option value={5}>5+</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Bathrooms</label>
            <select
              value={filters.bathrooms}
              onChange={(e) => handleFilterChange('bathrooms', parseInt(e.target.value))}
              className="filter-select"
            >
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
            </select>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .filters-container {
          background: var(--background-white);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-light);
          margin-bottom: 2rem;
          overflow: hidden;
        }

        .filters-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-light);
        }

        .search-form {
          flex: 1;
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .search-input-container {
          flex: 1;
          position: relative;
          max-width: 400px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 2px solid var(--border-light);
          border-radius: var(--border-radius);
          font-size: 0.9rem;
          transition: var(--transition);
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-btn {
          padding: 0.75rem 1.5rem;
          background: var(--primary-gradient);
          color: white;
          border: none;
          border-radius: var(--border-radius);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .search-btn:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-medium);
        }

        .filter-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--background-light);
          border: 2px solid var(--border-light);
          border-radius: var(--border-radius);
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
        }

        .filter-toggle:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.05);
        }

        .filter-toggle.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .chevron {
          transition: var(--transition);
        }

        .chevron.rotated {
          transform: rotate(180deg);
        }

        .clear-filters {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--error-color);
          color: white;
          border: none;
          border-radius: var(--border-radius);
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: var(--transition);
        }

        .clear-filters:hover {
          background: #dc2626;
          transform: translateY(-1px);
        }

        .filters-panel {
          overflow: hidden;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          padding: 1.5rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-select {
          padding: 0.75rem;
          border: 2px solid var(--border-light);
          border-radius: var(--border-radius);
          background: white;
          color: var(--text-primary);
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .filter-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        @media (max-width: 768px) {
          .filters-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .search-form {
            flex-direction: column;
          }

          .filter-actions {
            justify-content: center;
          }

          .filters-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Filters;