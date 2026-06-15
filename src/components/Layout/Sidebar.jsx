import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiPackage, 
  FiTag, 
  FiShoppingCart, 
  FiUsers, 
  FiSettings,
  FiBarChart2
} from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/products', icon: FiPackage, label: 'Products' },
    { path: '/categories', icon: FiTag, label: 'Categories' },
    { path: '/orders', icon: FiShoppingCart, label: 'Orders' },
    { path: '/customers', icon: FiUsers, label: 'Customers' },
    { path: '/reports', icon: FiBarChart2, label: 'Reports' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-dark-100 text-white transition-all duration-300 z-20 ${isOpen ? 'w-64' : 'w-20'}`}>
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        {isOpen ? (
          <span className="text-xl font-bold">Admin Panel</span>
        ) : (
          <span className="text-2xl font-bold">A</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-4 py-3 mx-2 mb-1 rounded-lg transition-all duration-200
              ${isActive 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }
              ${!isOpen && 'justify-center'}
            `}
          >
            <item.icon size={20} />
            {isOpen && <span className="ml-3">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;