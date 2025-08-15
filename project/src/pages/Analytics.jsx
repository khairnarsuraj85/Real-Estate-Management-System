import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { TrendingUp, DollarSign, Home, Users, MapPin, Calendar } from 'lucide-react';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/analytics');
        setAnalyticsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="error">
        <p>Failed to load analytics data</p>
      </div>
    );
  }

  const statsCards = [
    {
      icon: DollarSign,
      title: 'Avg. Property Value',
      value: `$${analyticsData.averagePrice?.toLocaleString() || '0'}`,
      change: '+12.5%',
      positive: true
    },
    {
      icon: Home,
      title: 'Total Listings',
      value: analyticsData.totalListings?.toLocaleString() || '0',
      change: '+8.3%',
      positive: true
    },
    {
      icon: Users,
      title: 'Active Buyers',
      value: analyticsData.activeBuyers?.toLocaleString() || '0',
      change: '+15.7%',
      positive: true
    },
    {
      icon: Calendar,
      title: 'Avg. Days on Market',
      value: `${analyticsData.avgDaysOnMarket || '0'} days`,
      change: '-5.2%',
      positive: true
    }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#667eea',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#667eea',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    },
    cutout: '60%'
  };

  return (
    <motion.div 
      className="analytics-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <motion.div 
          className="page-header"
          variants={itemVariants}
        >
          <h1 className="page-title">Market Analytics</h1>
          <p className="page-description">
            Comprehensive real estate market insights and trends analysis
          </p>
          
          <div className="time-range-selector">
            {['3months', '6months', '1year', '2years'].map((range) => (
              <motion.button
                key={range}
                className={`range-btn ${timeRange === range ? 'active' : ''}`}
                onClick={() => setTimeRange(range)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {range === '3months' && '3M'}
                {range === '6months' && '6M'}
                {range === '1year' && '1Y'}
                {range === '2years' && '2Y'}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="stat-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="stat-icon">
                  <Icon size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-title">{stat.title}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                    <TrendingUp size={16} />
                    {stat.change}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Market Trends Chart */}
          <motion.div 
            className="chart-container large"
            variants={itemVariants}
          >
            <div className="chart-header">
              <h3 className="chart-title">Market Price Trends</h3>
              <p className="chart-subtitle">Average property prices over time</p>
            </div>
            <div className="chart-wrapper">
              <Line 
                data={{
                  labels: analyticsData.marketTrends?.labels || [],
                  datasets: [
                    {
                      label: 'Average Price',
                      data: analyticsData.marketTrends?.datasets[0].data || [],
                      borderColor: '#667eea',
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    }
                  ]
                }} 
                options={chartOptions} 
              />
            </div>
          </motion.div>

          {/* Property Types Distribution */}
          <motion.div 
            className="chart-container"
            variants={itemVariants}
          >
            <div className="chart-header">
              <h3 className="chart-title">Property Types</h3>
              <p className="chart-subtitle">Distribution by type</p>
            </div>
            <div className="chart-wrapper">
              <Doughnut 
                data={{
                  labels: analyticsData.propertyTypes?.labels || [],
                  datasets: [
                    {
                      data: analyticsData.propertyTypes?.datasets[0].data || [],
                      backgroundColor: ['#667eea', '#764ba2', '#6B46C1', '#553C9A'],
                    }
                  ]
                }}
                options={doughnutOptions} 
              />
            </div>
          </motion.div>

          {/* Sales Volume */}
          <motion.div 
            className="chart-container"
            variants={itemVariants}
          >
            <div className="chart-header">
              <h3 className="chart-title">Sales Volume</h3>
              <p className="chart-subtitle">Quarterly sales data</p>
            </div>
            <div className="chart-wrapper">
              <Bar 
                data={{
                  labels: analyticsData.salesVolume?.labels || [],
                  datasets: [
                    {
                      label: 'Sales',
                      data: analyticsData.salesVolume?.datasets[0].data || [],
                      backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    }
                  ]
                }}
                options={chartOptions} 
              />
            </div>
          </motion.div>
        </div>

        {/* Location Insights */}
        <motion.div 
          className="location-insights"
          variants={itemVariants}
        >
          <div className="insights-header">
            <h3 className="insights-title">Popular Locations</h3>
            <p className="insights-subtitle">Top performing markets</p>
          </div>
          
          <div className="locations-list">
            {(analyticsData.locationPopularity || []).map((location, index) => (
              <motion.div
                key={index}
                className="location-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="location-info">
                  <div className="location-icon">
                    <MapPin size={18} />
                  </div>
                  <div className="location-details">
                    <div className="location-name">{location.location}</div>
                    <div className="location-count">{location.count} properties</div>
                  </div>
                </div>
                <div className="location-growth">
                  <span className="growth-value">{location.growth}</span>
                  <TrendingUp size={16} className="growth-icon" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .analytics-page {
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
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .page-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .time-range-selector {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          background: var(--background-white);
          padding: 0.5rem;
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-light);
          display: inline-flex;
        }

        .range-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--border-radius);
          background: transparent;
          color: var(--text-secondary);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .range-btn:hover {
          background: var(--background-light);
          color: var(--text-primary);
        }

        .range-btn.active {
          background: var(--primary-gradient);
          color: white;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--background-white);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-light);
          transition: var(--transition);
        }

        .stat-card:hover {
          box-shadow: var(--shadow-large);
        }

        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: var(--primary-gradient);
          border-radius: 50%;
          color: white;
        }

        .stat-content {
          flex: 1;
        }

        .stat-title {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .stat-change {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .stat-change.positive {
          color: var(--success-color);
        }

        .stat-change.negative {
          color: var(--error-color);
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .chart-container {
          background: var(--background-white);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-light);
          padding: 1.5rem;
          transition: var(--transition);
        }

        .chart-container:hover {
          box-shadow: var(--shadow-medium);
        }

        .chart-container.large {
          grid-column: span 2;
        }

        .chart-header {
          margin-bottom: 1.5rem;
        }

        .chart-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .chart-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .chart-wrapper {
          height: 300px;
          position: relative;
        }

        .location-insights {
          background: var(--background-white);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-light);
          padding: 2rem;
        }

        .insights-header {
          margin-bottom: 2rem;
        }

        .insights-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .insights-subtitle {
          color: var(--text-secondary);
        }

        .locations-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .location-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: var(--background-light);
          border-radius: var(--border-radius);
          transition: var(--transition);
          cursor: pointer;
        }

        .location-item:hover {
          background: rgba(102, 126, 234, 0.05);
        }

        .location-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .location-icon {
          color: var(--text-secondary);
        }

        .location-name {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .location-count {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .location-growth {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--success-color);
          font-weight: 600;
        }

        .growth-value {
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }

          .chart-container.large {
            grid-column: span 1;
          }

          .stat-card {
            flex-direction: column;
            text-align: center;
          }

          .time-range-selector {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Analytics;