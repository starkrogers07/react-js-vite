import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col shadow-lg h-screen border-r bg-slate-800  border-black">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <div className="flex flex-col flex-1 px-3 mt-6">
          <nav className="flex-1 space-y-2">
            <Link to="/" className="flex items-center px-4 py-2.5 text-sm font-medium text-black transition-all duration-200 bg-white rounded-lg hover:bg-purple-400">
              <FontAwesomeIcon icon={faHome} className="w-5 h-5 mr-4" />
              Home
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
