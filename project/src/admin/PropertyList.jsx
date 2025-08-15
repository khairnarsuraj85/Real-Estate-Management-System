import { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyList = ({ onEditProperty }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:5000/api/admin/properties', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch properties');
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`http://localhost:5000/api/admin/properties/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProperties(properties.filter(property => property.id !== id));
      } catch (err) {
        setError('Failed to delete property');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading properties...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="property-list">
      <div className="header">
        <h2>Manage Properties</h2>
        <div className="count">{properties.length} properties</div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Location</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>{property.title}</td>
              <td>{property.location}</td>
              <td>${property.price.toLocaleString()}</td>
              <td>
                <span className={`status-badge ${property.status.toLowerCase().replace(' ', '-')}`}>
                  {property.status}
                </span>
              </td>
              <td className="actions">
                <button 
                  className="edit-btn"
                  onClick={() => onEditProperty(property)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(property.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .property-list {
          width: 100%;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        h2 {
          color: #2d3748;
          font-size: 1.5rem;
        }
        .count {
          background: #edf2f7;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          color: #4a5568;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
        th {
          background-color: #f7fafc;
          color: #718096;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.85rem;
        }
        tr:hover {
          background-color: #f7fafc;
        }
        .status-badge {
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .status-badge.for-sale {
          background: #ebf8ff;
          color: #3182ce;
        }
        .status-badge.for-rent {
          background: #fff5f5;
          color: #e53e3e;
        }
        .actions {
          display: flex;
          gap: 0.5rem;
        }
        .edit-btn, .delete-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .edit-btn {
          background: #ebf8ff;
          color: #3182ce;
        }
        .edit-btn:hover {
          background: #bee3f8;
        }
        .delete-btn {
          background: #fff5f5;
          color: #e53e3e;
        }
        .delete-btn:hover {
          background: #fed7d7;
        }
        .loading, .error {
          text-align: center;
          padding: 2rem;
          color: #718096;
        }
        .error {
          color: #e53e3e;
        }
      `}</style>
    </div>
  );
};

export default PropertyList;