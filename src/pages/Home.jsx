import React from 'react';
import { Link } from 'react-router-dom';
import { usePreferences } from '../hooks/usePreferences';
import { buildSelectedTree } from '../utils/treeUtils';
import { initialData } from '../data/initialData';
import {
  PlusCircleIcon,
  ArrowRightIcon,
  BookOpenIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export const Home = () => {
  const { selectedServices, isLoading } = usePreferences();
  const selectedTree = buildSelectedTree(initialData, selectedServices);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">
          Loading services...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedTree.length === 0 && (
            <Link
              to="/preferences"
              className="group border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-150"
            >
              <div className="flex flex-col items-center text-center">
                <Cog6ToothIcon className="h-8 w-8 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                  Configure Service Preferences
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Get started by selecting the services you're interested in
                </p>
                <div className="mt-4 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  <PlusCircleIcon className="h-5 w-5 mr-2" />
                  Add Services
                </div>
              </div>
            </Link>
          )}

          {selectedTree.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                <div className="mt-4 space-y-4">
                  {category.children?.map((product) => (
                    <div key={product.id} className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {product.name}
                      </h4>
                      <ul className="ml-4 space-y-1">
                        {product.children?.map((service) => (
                          <li
                            key={service.id}
                            className="text-sm text-gray-600 dark:text-gray-400"
                          >
                            • {service.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* New Book of Work Card - Always shown last */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <BookOpenIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  New Book of Work
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Track and manage your service requests efficiently.
              </p>
            </div>
          </div>
        </div>

        {selectedTree.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Link
              to="/preferences"
              className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Manage Services
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};