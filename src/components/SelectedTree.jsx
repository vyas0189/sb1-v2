import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDownIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const SelectedTree = ({ node, onRemove, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={`
          flex items-center justify-between p-2 rounded-lg
          hover:bg-gray-100 dark:hover:bg-gray-800 
          transition-colors duration-150 group
        `}
        style={{ marginLeft: `${depth * 0.75}rem` }}
      >
        <div className="flex items-center space-x-2 min-w-0">
          {hasChildren && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-150"
            >
              {isOpen ? (
                <ChevronDownIcon className="w-3 h-3 text-gray-400 dark:text-gray-500" />
              ) : (
                <ChevronRightIcon className="w-3 h-3 text-gray-400 dark:text-gray-500" />
              )}
            </button>
          )}
          <span className={`
            truncate text-sm
            ${depth === 0 ? 'font-medium text-gray-700 dark:text-gray-200' : 'text-gray-600 dark:text-gray-300'}
            ${hasChildren ? 'cursor-pointer' : ''}
          `}
          onClick={hasChildren ? () => setIsOpen(!isOpen) : undefined}
          >
            {node.name}
          </span>
        </div>
        <button
          onClick={() => onRemove(node.id, false)}
          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          aria-label="Remove"
        >
          <XMarkIcon className="w-3 h-3" />
        </button>
      </div>
      
      {isOpen && hasChildren && (
        <div className="mt-1">
          {node.children.map((child) => (
            <SelectedTree
              key={child.id}
              node={child}
              onRemove={onRemove}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

SelectedTree.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  depth: PropTypes.number,
};