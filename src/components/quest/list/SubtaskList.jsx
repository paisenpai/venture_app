import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatListDate, getStatusDisplayName } from "../../../utils/QuestBoard/listViewUtils";

const SubtaskList = ({ 
  subtasks = [], 
  onEdit, 
  onDelete, 
  onChangeStatus, 
  parentId 
}) => {
  const [activeSubtaskId, setActiveSubtaskId] = useState(null);

  // Status styling
  const getStatusStyle = (status) => {
    const styles = {
      available: "bg-blue-100 text-blue-800",
      ongoing: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
    };
    
    return styles[status] || styles.available;
  };

  // Handler for status change
  const handleStatusChange = (subtaskId, newStatus) => {
    onChangeStatus(parentId, subtaskId, newStatus);
    setActiveSubtaskId(null);
  };

  return (
    <div className="border-t border-gray-100 bg-gray-50">
      <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
        Subtasks
      </div>
      <div className="divide-y divide-gray-100">
        {subtasks.map((subtask) => (
          <div key={subtask.id} className="px-4 py-2 flex items-center">
            {/* Progress circle for subtasks */}
            <div className="w-8 h-8 relative flex-shrink-0 mr-3">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle 
                  cx="18" cy="18" r="16" 
                  fill="none" 
                  className="stroke-current text-gray-200" 
                  strokeWidth="2" 
                />
                <circle 
                  cx="18" cy="18" r="16" 
                  fill="none" 
                  className="stroke-current text-yellow-400" 
                  strokeWidth="2"
                  strokeDasharray={`${subtask.progress || 0} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
                <text 
                  x="18" y="18" 
                  dominantBaseline="middle" 
                  textAnchor="middle"
                  className="fill-current text-xs font-medium text-gray-600"
                >
                  {subtask.progress || 0}%
                </text>
              </svg>
            </div>
            
            {/* Subtask details */}
            <div className="flex-grow">
              <h4 className="text-sm font-medium text-gray-900">{subtask.name}</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusStyle(subtask.status)}`}>
                  {getStatusDisplayName(subtask.status)}
                </span>
                {subtask.dueDate && (
                  <span className="text-xs text-gray-500">
                    Due: {formatListDate(subtask.dueDate)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Actions dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveSubtaskId(activeSubtaskId === subtask.id ? null : subtask.id)}
                className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              
              {/* Dropdown menu for subtask actions */}
              {activeSubtaskId === subtask.id && (
                <div className="absolute right-0 z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1 text-sm">
                  {/* Status actions */}
                  {subtask.status !== "ongoing" && (
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleStatusChange(subtask.id, "ongoing")}
                    >
                      Start
                    </button>
                  )}
                  
                  {subtask.status !== "completed" && (
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleStatusChange(subtask.id, "completed")}
                    >
                      Complete
                    </button>
                  )}
                  
                  {subtask.status === "completed" && (
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleStatusChange(subtask.id, "available")}
                    >
                      Reactivate
                    </button>
                  )}
                  
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      onEdit(parentId, subtask.id);
                      setActiveSubtaskId(null);
                    }}
                  >
                    Edit
                  </button>
                  
                  <button
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      onDelete(parentId, subtask.id);
                      setActiveSubtaskId(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SubtaskList.propTypes = {
  subtasks: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default SubtaskList;