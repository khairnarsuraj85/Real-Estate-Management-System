import { useState } from 'react';
import axios from 'axios';

const AddProperty = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    status: 'For Sale',
    type: 'House',
    bedrooms: '',
    bathrooms: '',
    area: '',
    year_built: '',
    description: '',
    amenities: '',
    agent_name: '',
    agent_phone: '',
    agent_email: ''
  });
  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('adminToken');
      const formDataToSend = new FormData();
      
      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Append images
      images.forEach(image => {
        formDataToSend.append('images', image);
      });
      
      const response = await axios.post(
        'http://localhost:5000/api/admin/properties', 
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        onSuccess();
      } else {
        setError(response.data.message || 'Failed to add property');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property">
      <h2>Add New Property</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Form fields with corrected names */}
          <div className="form-group">
            <label>Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Location*</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Price ($)*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Status*</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Type*</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Bedrooms*</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Bathrooms*</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              step="0.5"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Area (sqft)*</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Year Built*</label>
            <input
              type="number"
              name="year_built"
              value={formData.year_built}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group full-width">
            <label>Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          
          <div className="form-group full-width">
            <label>Amenities (comma separated)</label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="Swimming Pool, Garage, Garden, Gym, ..."
            />
          </div>
          
          <div className="form-group">
            <label>Agent Name*</label>
            <input
              type="text"
              name="agent_name"
              value={formData.agent_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Agent Phone*</label>
            <input
              type="text"
              name="agent_phone"
              value={formData.agent_phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Agent Email*</label>
            <input
              type="email"
              name="agent_email"
              value={formData.agent_email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group full-width">
            <label>Property Images* (Multiple)</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              required
            />
            <div className="hint">Upload high-quality images of the property</div>
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Adding Property...' : 'Add Property'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .add-property {
          width: 100%;
        }
        h2 {
          margin-bottom: 1.5rem;
          color: #2d3748;
        }
        .error {
          background: #fff5f5;
          color: #e53e3e;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          border: 1px solid #fc8181;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .full-width {
          grid-column: span 2;
        }
        .form-group {
          margin-bottom: 0;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #4a5568;
        }
        input, select, textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
          transition: all 0.3s;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
          outline: none;
        }
        textarea {
          resize: vertical;
        }
        .hint {
          font-size: 0.85rem;
          color: #718096;
          margin-top: 0.3rem;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 1rem;
          gap: 1rem;
        }
        .cancel-btn {
          padding: 0.9rem 2rem;
          background: #e2e8f0;
          color: #4a5568;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .cancel-btn:hover:not(:disabled) {
          background: #cbd5e0;
        }
        .submit-btn {
          padding: 0.9rem 2rem;
          background: #48bb78;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .submit-btn:hover:not(:disabled) {
          background: #38a169;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(72, 187, 120, 0.3);
        }
        .submit-btn:disabled, .cancel-btn:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .full-width {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AddProperty;