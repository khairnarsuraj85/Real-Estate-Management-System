import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, Building, BarChart3, Search, User, Bell } from 'lucide-react';

const Header = ({ isAdmin, onAdminLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/properties', label: 'Properties', icon: Building },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <motion.header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <motion.div 
              className="logo-icon"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              🏡
            </motion.div>
            <span className="logo-text">EstateVision</span>
          </Link>

          <nav className="desktop-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link to="/admin/dashboard" className="nav-link">
                <User size={18} />
                Dashboard
              </Link>
            )}
          </nav>

          <div className="header-actions">
            <motion.button 
              className="search-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/properties')}
            >
              <Search size={20} />
            </motion.button>
            
            {isAdmin ? (
              <motion.button
                className="logout-btn"
                onClick={onAdminLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            ) : (
              <Link to="/admin/login" className="login-btn">
                Admin Login
              </Link>
            )}

            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="mobile-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
          {isAdmin && (
            <>
              <Link
                to="/admin/dashboard"
                className={`mobile-nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} />
                Dashboard
              </Link>
              <button
                className="mobile-nav-link logout"
                onClick={() => {
                  onAdminLogout();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          )}
          {!isAdmin && (
            <Link
              to="/admin/login"
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Login
            </Link>
          )}
        </div>
      </motion.div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-light);
          transition: var(--transition);
        }

        .header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: var(--shadow-medium);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.25rem;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .logo-text {
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .desktop-nav {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          transition: var(--transition);
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(102, 126, 234, 0.1);
        }

        .nav-link.active {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .search-btn, .notification-btn, .profile-btn {
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
          position: relative;
        }

        .search-btn:hover, .notification-btn:hover, .profile-btn:hover {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
        }

        .logout-btn, .login-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: var(--border-radius);
          background: var(--background-light);
          color: var(--text-primary);
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
        }

        .logout-btn:hover, .login-btn:hover {
          background: rgba(102, 126, 234, 0.1);
        }

        .mobile-menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: var(--border-radius);
          background: var(--background-light);
          color: var(--text-primary);
          cursor: pointer;
        }

        .mobile-menu {
          overflow: hidden;
          background: var(--background-white);
          border-top: 1px solid var(--border-light);
        }

        .mobile-nav {
          padding: 1rem;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          border-radius: var(--border-radius);
          transition: var(--transition);
          margin-bottom: 0.5rem;
        }

        .mobile-nav-link:hover {
          background: var(--background-light);
          color: var(--text-primary);
        }

        .mobile-nav-link.active {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
        }

        .mobile-nav-link.logout {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .search-btn, .notification-btn, .profile-btn {
            display: none;
          }

          .logout-btn, .login-btn {
            display: none;
          }

          .header-content {
            padding: 0.75rem 0;
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Header;