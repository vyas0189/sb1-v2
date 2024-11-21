import React from 'react';
import { Link } from 'react-router-dom';
import { usePreferences } from '../hooks/usePreferences';
import { buildSelectedTree } from '../utils/treeUtils';
import { initialData } from '../data/initialData';
import {
  PlusCircleIcon,
  WrenchScrewdriverIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export const Home = () => {
  const { selectedServices, isLoading } = usePreferences();
  const selectedTree = buildSelectedTree(initialData, selectedServices);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">
          Loading services...
        </div>
      </div>
    );
  }

  if (selectedTree.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <WrenchScrewdriverIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            No services selected
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by selecting the services you're interested in.
          </p>
          <div className="mt-6">
            <Link
              to="/preferences"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Select Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Services
        </h1>
        <Link
          to="/preferences"
          className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          Manage Services
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {selectedTree.map((category) => (
          <div
            key={category.id}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
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
      </div>
    </div>
  );
};