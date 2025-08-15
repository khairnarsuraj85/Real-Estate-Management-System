import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: ['About Us', 'Our Team', 'Careers', 'Contact']
    },
    {
      title: 'Services',
      links: ['Buy Property', 'Rent Property', 'Sell Property', 'Property Management']
    },
    {
      title: 'Resources',
      links: ['Market Reports', 'Investment Guide', 'Legal Info', 'FAQ']
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="brand-logo">
              <div className="logo-icon">🏡</div>
              <span className="logo-text">EstateVision</span>
            </div>
            <p className="brand-description">
              Your trusted partner in finding the perfect home. We combine cutting-edge technology 
              with personalized service to make your real estate journey exceptional.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Business District, NY 10001</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@estatevision.com</span>
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <h3 className="section-title">{section.title}</h3>
              <ul className="section-links">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href="#" className="footer-link">{link}</a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Section */}
          <motion.div 
            className="footer-newsletter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="section-title">Stay Updated</h3>
            <p className="newsletter-description">
              Get the latest market insights and property listings delivered to your inbox.
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <motion.button
                type="submit"
                className="newsletter-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
            
            {/* Social Links */}
            <div className="social-links">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="social-link"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="copyright">
            <p>&copy; 2024 EstateVision. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Cookie Policy</a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          color: white;
          padding: 4rem 0 2rem;
          margin-top: 4rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          max-width: 350px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-description {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: white;
        }

        .section-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.9rem;
          transition: var(--transition);
        }

        .footer-link:hover {
          color: white;
        }

        .newsletter-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--border-radius);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.9rem;
          backdrop-filter: blur(10px);
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
        }

        .newsletter-btn {
          padding: 0.75rem 1.5rem;
          background: var(--primary-gradient);
          color: white;
          border: none;
          border-radius: var(--border-radius);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: var(--transition);
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: var(--primary-gradient);
          color: white;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .copyright {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .footer-bottom .footer-link {
          font-size: 0.85rem;
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2rem;
          }

          .footer-brand {
            grid-column: span 3;
            max-width: none;
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 3rem 0 2rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-brand {
            grid-column: span 1;
          }

          .newsletter-form {
            flex-direction: column;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .footer-links {
            gap: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;