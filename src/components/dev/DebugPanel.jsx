import React, { useState } from "react";
import PropTypes from "prop-types";

const DebugPanel = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("quests");

  if (!data) return null;

  const tabs = {
    quests: data.quests || [],
    allSubtasks: data.allSubtasks || [],
    availableQuests: data.availableQuests || [],
    ongoingQuests: data.ongoingQuests || [],
    completedQuests: data.completedQuests || [],
    availableSubtasks: data.availableSubtasks || [],
    ongoingSubtasks: data.ongoingSubtasks || [],
    completedSubtasks: data.completedSubtasks || [],
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gray-800 text-white px-3 py-1 rounded-md text-xs flex items-center"
      >
        {isExpanded ? "Hide" : "Show"} Debug Panel
        <span className="ml-1 px-1.5 py-0.5 bg-gray-700 rounded text-xs">
          {Object.values(tabs).reduce(
            (total, arr) => total + (Array.isArray(arr) ? arr.length : 0),
            0
          )}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 w-96 max-h-96 overflow-hidden flex flex-col">
          <div className="p-2 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-sm">Debug Data</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          <div className="flex overflow-x-auto text-xs border-b border-gray-200">
            {Object.keys(tabs).map((tabName) => (
              <button
                key={tabName}
                onClick={() => setActiveTab(tabName)}
                className={`px-3 py-2 whitespace-nowrap ${
                  activeTab === tabName
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                {tabName} ({tabs[tabName].length})
              </button>
            ))}
          </div>

          <div className="overflow-auto p-2">
            <pre className="text-xs">{JSON.stringify(tabs[activeTab], null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

DebugPanel.propTypes = {
  data: PropTypes.object,
};

export default DebugPanel;
