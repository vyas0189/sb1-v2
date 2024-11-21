import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDownIcon, ChevronRightIcon, CheckIcon } from '@heroicons/react/24/outline';

export const TreeNode = ({ node, selected, onSelect, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selected.has(node.id);
  
  const handleSelect = (event) => {
    event.stopPropagation();
    onSelect(node.id, event.target.checked);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="select-none">
      <div 
        onClick={hasChildren ? toggleOpen : undefined}
        className={`
          flex items-center p-2 rounded-lg
          ${hasChildren ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50' : ''}
          ${depth === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : ''}
          transition-colors duration-150
        `}
        style={{ marginLeft: `${depth * 0.5}rem` }}
      >
        <div className="flex items-center flex-1 space-x-3">
          <div className="w-6">
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOpen();
                }}
                className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-150"
                aria-label={isOpen ? 'Collapse' : 'Expand'}
              >
                {isOpen ? (
                  <ChevronDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            )}
          </div>
          
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleSelect}
              className="
                w-4 h-4 rounded border-gray-300 dark:border-gray-600
                text-blue-600 dark:text-blue-400
                focus:ring-blue-500 dark:focus:ring-blue-400
                dark:bg-gray-700 dark:checked:bg-blue-400
                transition duration-150 ease-in-out
              "
              id={node.id}
              onClick={(e) => e.stopPropagation()}
            />
            <label 
              htmlFor={node.id}
              className={`ml-3 ${depth === 0 ? 'font-medium' : ''} ${
                isSelected 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {node.name}
            </label>
            {isSelected && (
              <CheckIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 ml-2 animate-appear" />
            )}
          </div>
        </div>
      </div>
      
      {isOpen && hasChildren && (
        <div className="mt-1">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selected={selected}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

TreeNode.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  selected: PropTypes.instanceOf(Set).isRequired,
  onSelect: PropTypes.func.isRequired,
  depth: PropTypes.number,
};