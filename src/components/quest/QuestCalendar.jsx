import { useState } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import { categoryColors } from "../../utils/QuestBoard/questBoardConstants";
import "react-calendar/dist/Calendar.css";

const QuestCalendarView = ({ quests }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedQuest, setSelectedQuest] = useState(null);

  // Group quests by their due dates
  const questsByDate = quests.reduce((acc, quest) => {
    const date = quest.dueDate?.split("T")[0]; // Get YYYY-MM-DD part
    if (!date) return acc;
    if (!acc[date]) acc[date] = [];
    acc[date].push(quest);
    return acc;
  }, {});

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get category color
  const getCategoryColor = (category) => {
    return categoryColors[category]?.split(" ")[0] || "bg-gray-200";
  };

  // Custom tile content for react-calendar
  const tileContent = ({ date }) => {
    const dateStr = date.toISOString().split("T")[0];
    const dateQuests = questsByDate[dateStr] || [];

    if (dateQuests.length === 0) return null;

    return (
      <div className="flex flex-wrap justify-center mt-1">
        {dateQuests.slice(0, 3).map((quest, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 mx-0.5 rounded-full ${getCategoryColor(
              quest.category
            )}`}
            title={quest.name}
          />
        ))}
        {dateQuests.length > 3 && (
          <span className="text-xs">+{dateQuests.length - 3}</span>
        )}
      </div>
    );
  };

  // Handle selecting a date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedQuest(null);
  };

  // Handle selecting a quest
  const handleSelectQuest = (quest) => {
    setSelectedQuest(quest);
  };

  // Get quests for the selected date
  const getQuestsForSelectedDate = () => {
    const dateStr = selectedDate.toISOString().split("T")[0];
    return questsByDate[dateStr] || [];
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
          className="w-full border rounded-lg shadow-md"
        />
      </div>
      <div className="lg:w-1/2">
        <div className="bg-white border rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold mb-4">
            Quests for {formatDate(selectedDate)}
          </h3>
          {getQuestsForSelectedDate().length === 0 ? (
            <p className="text-gray-500">No quests scheduled for this day.</p>
          ) : (
            <div className="space-y-3">
              {getQuestsForSelectedDate().map((quest) => (
                <div
                  key={quest.id}
                  className={`p-3 border rounded-lg cursor-pointer ${
                    selectedQuest?.id === quest.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleSelectQuest(quest)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getCategoryColor(
                        quest.category
                      )}`}
                    />
                    <h4 className="font-medium">{quest.name}</h4>
                  </div>
                  {selectedQuest?.id === quest.id && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        {quest.goal || "No description"}
                      </p>
                      <div className="mt-2 flex justify-between text-xs">
                        <span className="text-indigo-700 font-semibold">
                          {quest.xp} XP
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full ${
                            quest.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : quest.status === "ongoing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {quest.status.charAt(0).toUpperCase() +
                            quest.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

QuestCalendarView.propTypes = {
  quests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      goal: PropTypes.string,
      dueDate: PropTypes.string.isRequired,
      xp: PropTypes.number,
      priority: PropTypes.number,
      status: PropTypes.string,
      subtasks: PropTypes.array,
    })
  ).isRequired,
};

export default QuestCalendarView;
