import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { 
  SunIcon, 
  MoonIcon, 
  UserCircleIcon,
  ChevronDownIcon,
  HomeIcon,
  DocumentTextIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const user = { firstName: 'John' }; // Mock user data

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <HomeIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                Service Portal
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/requests"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <DocumentTextIcon className="h-5 w-5 mr-1" />
                My Requests
              </Link>
              <Link
                to="/incidents"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                My Incidents
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            <div className="ml-3 relative">
              <div className="flex items-center">
                <button
                  className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  id="user-menu"
                  aria-haspopup="true"
                >
                  <UserCircleIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  <span className="hidden md:block text-gray-700 dark:text-gray-300">
                    {user.firstName}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};