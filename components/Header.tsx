
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-orange-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-lg">
            <i className="fas fa-envelope-open-text text-orange-600 text-2xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">BharatPost AI Sorter</h1>
            <p className="text-orange-100 text-xs font-medium uppercase tracking-wider">Indian Postal Service Intelligence</p>
          </div>
        </div>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-orange-200 transition">Dashboard</a>
          <a href="#" className="hover:text-orange-200 transition">History</a>
          <a href="#" className="hover:text-orange-200 transition">Settings</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
