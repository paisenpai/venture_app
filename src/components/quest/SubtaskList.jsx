import QuestBoard from "./QuestBoard";

const SubtaskList = ({ questId, subtasks, onEditSubtask, onDeleteSubtask }) => (
    <div className="flex flex-row flex-wrap gap-4 mt-4">
        {subtasks.map((subtask) => (
            <QuestBoard
                key={subtask.id}
                type="subtask"
                {...subtask}
                onEditQuest={(updatedSubtask) =>
                    onEditSubtask(questId, subtask.id, updatedSubtask)
                }
                onDeleteQuest={() => onDeleteSubtask(questId, subtask.id)}
            />
        ))}
    </div>
);

export default SubtaskList;