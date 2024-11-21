import React, { useState } from 'react';
import { TreeNode } from '../components/TreeNode';
import { SelectedTree } from '../components/SelectedTree';
import { SearchBar } from '../components/SearchBar';
import { initialData } from '../data/initialData';
import { usePreferences } from '../hooks/usePreferences';
import { buildSelectedTree } from '../utils/treeUtils';
import { searchNodes } from '../utils/searchUtils';
import { 
  Cog6ToothIcon,
  ArrowDownTrayIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

export const Preferences = () => {
  const { 
    selectedServices,
    isLoading,
    isSaving,
    isOffline,
    hasUnsavedChanges,
    savePreferences,
    updateLocalServices
  } = usePreferences();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSearchTerm, setSelectedSearchTerm] = useState('');

  const handleSelect = (id, isSelected) => {
    const newSelected = new Set(selectedServices);

    const selectNode = (node) => {
      if (isSelected) {
        newSelected.add(node.id);
      } else {
        newSelected.delete(node.id);
      }

      if (node.children) {
        node.children.forEach(selectNode);
      }
    };

    const findAndSelectNode = (nodes) => {
      for (const node of nodes) {
        if (node.id === id) {
          selectNode(node);
          return true;
        }
        if (node.children && findAndSelectNode(node.children)) {
          return true;
        }
      }
      return false;
    };

    findAndSelectNode(initialData);
    updateLocalServices(newSelected);
  };

  const filteredData = searchNodes(initialData, searchTerm);
  const selectedTree = buildSelectedTree(initialData, selectedServices);
  const filteredSelectedTree = searchNodes(selectedTree, selectedSearchTerm);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">
          Loading preferences...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {isOffline && (
          <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-700 rounded-lg flex items-center space-x-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Working in offline mode. Changes will not be saved until the backend server is running.
            </p>
          </div>
        )}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cog6ToothIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Service Preferences
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedServices.size} items selected
                </span>
                <button
                  onClick={savePreferences}
                  disabled={isSaving || isOffline || !hasUnsavedChanges}
                  className={`
                    inline-flex items-center px-4 py-2 rounded-md text-sm font-medium
                    ${(isSaving || isOffline || !hasUnsavedChanges)
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500'
                    }
                    transition-colors duration-150
                  `}
                >
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-6 border-r border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search available services..."
                />
                <div className="space-y-2">
                  {filteredData.map((node) => (
                    <TreeNode
                      key={node.id}
                      node={node}
                      selected={selectedServices}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
                {filteredData.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    No services found matching your search.
                  </p>
                )}
              </div>
            </div>

            <div className="md:w-1/3 p-6 bg-gray-50 dark:bg-gray-900">
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Selected Services
                </h2>
                <SearchBar
                  value={selectedSearchTerm}
                  onChange={setSelectedSearchTerm}
                  placeholder="Search selected services..."
                />
                {filteredSelectedTree.length > 0 ? (
                  <div className="space-y-2">
                    {filteredSelectedTree.map((node) => (
                      <SelectedTree
                        key={node.id}
                        node={node}
                        onRemove={handleSelect}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedServices.size > 0
                      ? 'No selected services match your search.'
                      : 'No services selected. Choose from the categories on the left.'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};