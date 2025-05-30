import React from "react";
import PropTypes from "prop-types";
import QuestBoard from "./QuestBoard";

const SubtaskList = ({
  questId,
  subtasks = [],
  onEditSubtask,
  onDeleteSubtask,
  onChangeSubtaskStatus,
}) => {
  if (!subtasks || subtasks.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3 px-2">
        Subtasks ({subtasks.length})
      </h4>
      <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar">
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="flex-shrink-0"
            style={{ width: "320px", maxWidth: "320px" }}
          >
            <QuestBoard
              id={subtask.id}
              name={subtask.name || ""}
              category="Subtask"
              goal={subtask.goal || ""}
              xp={0}
              priority={1}
              progress={subtask.progress || 0}
              type="subtask"
              onEditQuest={() => onEditSubtask(questId, subtask.id)}
              onDeleteQuest={() => onDeleteSubtask(questId, subtask.id)}
              onChangeStatus={(status) =>
                onChangeSubtaskStatus &&
                onChangeSubtaskStatus(questId, subtask.id, status)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

SubtaskList.propTypes = {
  questId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtasks: PropTypes.array,
  onEditSubtask: PropTypes.func.isRequired,
  onDeleteSubtask: PropTypes.func.isRequired,
  onChangeSubtaskStatus: PropTypes.func,
};

export default SubtaskList;
