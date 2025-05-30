import React from 'react';
import PropTypes from 'prop-types';
import { componentStyles } from "../../styles/designSystem";

const QuestFilters = ({ 
  searchTerm, 
  onSearchChange, 
  filter, 
  onFilterChange, 
  sortBy, 
  onSortChange,
  onAddQuest
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      {/* Search */}
      <div className="relative w-full md:w-64">
        <input
          type="text"
          placeholder="Search quests..."
          value={searchTerm}
          onChange={onSearchChange}
          className={componentStyles.input}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        {/* Filter */}
        <div className="w-full sm:w-40">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1">Filter</label>
          <select
            value={filter}
            onChange={onFilterChange}
            className={componentStyles.select}
          >
            <option value="all">All Quests</option>
            <option value="available">Available</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        {/* Sort */}
        <div className="w-full sm:w-40">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1">Sort by</label>
          <select
            value={sortBy}
            onChange={onSortChange}
            className={componentStyles.select}
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="xp">XP Value</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
      
      {/* Add Button */}
      <button
        onClick={onAddQuest}
        className={`${componentStyles.button.primary} flex items-center space-x-1 px-4 py-2 mt-4 md:mt-0`}
      >
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add Quest</span>
      </button>
    </div>
  );
};

QuestFilters.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onAddQuest: PropTypes.func.isRequired
};

export default QuestFilters;