import React, { useState, useEffect } from 'react';
import { FiPackage, FiShoppingCart, FiUsers, FiDollarSign } from 'react-icons/fi';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatCard, ChartCard, RecentOrders, LoadingSpinner } from '../components';
import { productService, orderService } from '../services';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const products = await productService.getAll();
      const orders = await orderService.getAll();
      
      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalCustomers: 1245,
        totalRevenue: orders.reduce((sum, order) => sum + order.total_amount, 0),
      });

      setSalesData([
        { month: 'Jan', sales: 4000, orders: 240 },
        { month: 'Feb', sales: 3000, orders: 198 },
        { month: 'Mar', sales: 5000, orders: 320 },
        { month: 'Apr', sales: 4780, orders: 290 },
        { month: 'May', sales: 5890, orders: 380 },
        { month: 'Jun', sales: 6390, orders: 420 },
        { month: 'Jul', sales: 7490, orders: 480 },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: FiPackage, color: 'blue', change: '+12%', trend: 'up' },
    { title: 'Total Orders', value: stats.totalOrders, icon: FiShoppingCart, color: 'green', change: '+8.2%', trend: 'up' },
    { title: 'Total Customers', value: stats.totalCustomers, icon: FiUsers, color: 'purple', change: '+15%', trend: 'up' },
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: FiDollarSign, color: 'yellow', change: '+12.5%', trend: 'up' },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Admin!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (<StatCard key={index} {...stat} />))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Sales Overview" change="+15.2%" trend="up">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Orders Trend" change="+8.2%" trend="up">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;