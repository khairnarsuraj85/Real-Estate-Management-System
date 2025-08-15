import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password
      });
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        onLoginSuccess(response.data.token);
        navigate('/admin/dashboard');
      } else {
        setError(response.data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .admin-login {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f5f7fa;
        }
        .login-container {
          background: white;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 450px;
        }
        h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #2d3748;
          font-size: 1.8rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #4a5568;
        }
        input {
          width: 100%;
          padding: 0.9rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s;
        }
        input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
          outline: none;
        }
        .error-message {
          color: #e53e3e;
          margin-bottom: 1.5rem;
          padding: 0.75rem;
          background: #fff5f5;
          border-radius: 8px;
          border: 1px solid #fc8181;
        }
        .login-btn {
          width: 100%;
          padding: 1rem;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .login-btn:hover:not(:disabled) {
          background: #5a67d8;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(102, 126, 234, 0.4);
        }
        .login-btn:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;