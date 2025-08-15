import { useState } from 'react';
import AddProperty from './AddProperty';
import EditProperty from './EditProperty';
import PropertyList from './PropertyList'; // Fixed import

const AdminDashboard = () => {
  const [view, setView] = useState('list'); // 'list', 'add', 'edit'
  const [currentProperty, setCurrentProperty] = useState(null);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        {view === 'list' && (
          <button 
            className="add-btn"
            onClick={() => setView('add')}
          >
            + Add New Property
          </button>
        )}
      </div>

      {view === 'list' && (
        <PropertyList 
          onEditProperty={(property) => {
            setCurrentProperty(property);
            setView('edit');
          }}
        />
      )}

      {view === 'add' && (
        <AddProperty 
          onSuccess={() => {
            setView('list');
          }}
          onCancel={() => setView('list')}
        />
      )}

      {view === 'edit' && currentProperty && (
        <EditProperty 
          property={currentProperty}
          onSuccess={() => {
            setView('list');
          }}
          onCancel={() => setView('list')}
        />
      )}

      <style jsx>{`
        .admin-dashboard {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        h1 {
          font-size: 1.8rem;
          color: #2d3748;
        }
        .add-btn {
          padding: 0.8rem 1.5rem;
          background: #4299e1;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .add-btn:hover {
          background: #3182ce;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(66, 153, 225, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;