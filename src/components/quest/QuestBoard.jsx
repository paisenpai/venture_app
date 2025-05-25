import { useState } from "react";
import PropTypes from "prop-types";
import { categoryColors } from "../../utils/QuestBoard/questBoardConstants";
import SwordShieldIcon from "../../assets/icons/SwordShield.png";

// --- AddQuestForm Component ---
const AddQuestForm = ({ onSubmit, onClose, initialData = {}, isSubtask = false }) => {
    // Merge initialData with default values to ensure all fields are defined
    const [formData, setFormData] = useState({
        name: initialData.name || "",
        category: initialData.category || "Other",
        goal: initialData.goal || "",
        dueDate: initialData.dueDate || "",
        xp: initialData.xp || 0,
        daysLeft: initialData.daysLeft || 0,
        priority: initialData.priority || 1,
        status: initialData.status || "available",
        subtasks: initialData.subtasks || [], // Ensure subtasks is always an array
        progress: initialData.progress || 0, // Progress for the EXP bar
    });

    const [subtask, setSubtask] = useState(""); // State for the current subtask input

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Automatically calculate daysLeft when dueDate changes
        if (name === "dueDate") {
            const currentDate = new Date();
            const selectedDate = new Date(value);
            const timeDifference = selectedDate - currentDate;
            const calculatedDaysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

            setFormData((prev) => ({
                ...prev,
                [name]: value,
                daysLeft: calculatedDaysLeft > 0 ? calculatedDaysLeft : 0, // Ensure daysLeft is not negative
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddSubtask = () => {
        if (subtask.trim()) {
            setFormData((prev) => ({
                ...prev,
                subtasks: [...prev.subtasks, subtask], // Add the new subtask to the array
            }));
            setSubtask(""); // Clear the subtask input
        }
    };

    const handleRemoveSubtask = (index) => {
        setFormData((prev) => ({
            ...prev,
            subtasks: prev.subtasks.filter((_, i) => i !== index), // Remove the subtask at the specified index
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    const handleProgressChange = (e) => {
        const progress = Math.min(Math.max(Number(e.target.value), 0), 100); // Clamp progress between 0 and 100
        setFormData((prev) => ({ ...prev, progress }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">
                    {initialData.name ? (isSubtask ? "Edit Subtask" : "Edit Quest") : isSubtask ? "Add New Subtask" : "Add New Quest"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder={isSubtask ? "Subtask Name" : "Quest Name"}
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border rounded p-2"
                    >
                        {Object.keys(categoryColors).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="goal"
                        placeholder="Goal"
                        value={formData.goal}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    />
                    {!isSubtask && (
                        <>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                            <input
                                type="number"
                                name="daysLeft"
                                placeholder="Days Left"
                                value={formData.daysLeft}
                                onChange={handleChange}
                                className="border rounded p-2"
                                readOnly // Make this field read-only since it's auto-calculated
                            />
                        </>
                    )}
                    <input
                        type="number"
                        name="xp"
                        placeholder="XP"
                        value={formData.xp}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    />
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="border rounded p-2"
                    >
                        {[1, 2, 3, 4].map((level) => (
                            <option key={level} value={level}>
                                Priority {level}
                            </option>
                        ))}
                    </select>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="border rounded p-2"
                    >
                        <option value="available">Available</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>

                    {/* Subtask Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-2">Subtasks</h3>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Add a subtask"
                                value={subtask}
                                onChange={(e) => setSubtask(e.target.value)}
                                className="border rounded p-2 flex-1"
                            />
                            <button
                                type="button"
                                onClick={handleAddSubtask}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Add
                            </button>
                        </div>
                        <ul className="list-disc pl-5">
                            {Array.isArray(formData.subtasks) &&
                                formData.subtasks.map((task, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span>{task}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSubtask(index)}
                                            className="text-red-500 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* EXP Progress Bar for Subtasks */}
                    {isSubtask && (
                        <div>
                            <h3 className="text-lg font-bold mb-2">EXP Progress</h3>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    name="progress"
                                    placeholder="Progress (%)"
                                    value={formData.progress}
                                    onChange={handleProgressChange}
                                    className="border rounded p-2 w-20"
                                />
                                <span>{formData.progress}%</span>
                            </div>
                            <div className="w-full h-4 bg-gray-200 rounded-full mt-2">
                                <div
                                    className="h-full bg-yellow-500 rounded-full"
                                    style={{ width: `${formData.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            {initialData.name ? "Save Changes" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- QuestBoard Component ---
const QuestBoard = ({
    type = "default",
    level = 1,
    daysLeft = "n",
    name = "Task Name",
    category = "Other",
    goal = "Goal",
    dueDate = "00/00/00",
    xp = 0,
    priority = 1,
    status = "available",
    progress = 0, // Add progress for subtasks
    onAddQuest,
    onDeleteQuest,
    onEditQuest,
    onChangeStatus,
}) => {
    const [showForm, setShowForm] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [editData, setEditData] = useState(null); // State to hold the data being edited

    const handleEditSubmit = (updatedData) => {
        onEditQuest(updatedData); // Call the parent-provided edit function
        setShowForm(false); // Close the form after submission
    };

    const handleEditClick = () => {
        setEditData({
            name,
            category,
            goal,
            dueDate,
            xp,
            daysLeft,
            priority,
            status,
            progress, // Include progress for subtasks
        });
        setShowForm(true);
    };

    if (type === "add") {
        return (
            <>
                <div
                    className="w-80 h-52 bg-white rounded-xl shadow-md flex items-center justify-center cursor-pointer"
                    onClick={() => setShowForm(true)}
                >
                    <span className="text-gray-500 text-lg font-bold">+ Add Quest</span>
                </div>
                {showForm && (
                    <AddQuestForm
                        onSubmit={onAddQuest}
                        onClose={() => setShowForm(false)}
                    />
                )}
            </>
        );
    }

    if (type === "default") {
        return (
            <>
                <div className="w-80 h-52 bg-white rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex items-center justify-center">
                    {/* Inner Frame */}
                    <div className="w-72 h-48 p-4 bg-gray-50 rounded-lg flex flex-col justify-between">
                        {/* Layer 1: Top Row */}
                        <div className="flex justify-between items-center">
                            {/* Category Circle and Task Name */}
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-8 h-8 ${categoryColors[category] || "bg-neutral-400"} rounded-full`}
                                />
                                <div className="text-neutral-700 text-lg font-bold truncate text-left flex-1">
                                    {name}
                                </div>
                            </div>
                            {/* Settings Button */}
                            <div className="relative">
                                <button
                                    className="p-1 rounded-full hover:bg-gray-200 flex items-center justify-center"
                                    onClick={() => setShowMenu((prev) => !prev)}
                                >
                                    <div className="flex flex-col items-center justify-center gap-0.5">
                                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                    </div>
                                </button>
                                {showMenu && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                            onClick={handleEditClick}
                                        >
                                            Edit
                                        </button>
                                        {status !== "available" && (
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                                onClick={() => onChangeStatus("available")}
                                            >
                                                Move to Available
                                            </button>
                                        )}
                                        {status !== "ongoing" && (
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                                onClick={() => onChangeStatus("ongoing")}
                                            >
                                                Move to Ongoing
                                            </button>
                                        )}
                                        {status !== "completed" && (
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                                onClick={() => onChangeStatus("completed")}
                                            >
                                                Move to Completed
                                            </button>
                                        )}
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                            onClick={onDeleteQuest}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Layer 2: Descriptive Details */}
                        <div className="flex items-center justify-center gap-2 text-neutral-500 text-sm mt-2">
                            <span>{category}</span>
                            <div
                                className={`w-1 h-1 ${categoryColors[category] || "bg-neutral-400"} rounded-full`}
                            />
                            <span>{goal}</span>
                        </div>

                        {/* Layer 3: Deadline Info */}
                        {type === "default" && (
                            <div className="flex justify-between items-center mt-4">
                                <div className="px-2 py-0.5 bg-gray-200 rounded-full text-xs font-bold text-blue-900">
                                    {daysLeft} Day(s) Left
                                </div>
                                <div className="px-2 py-0.5 bg-gray-200 rounded-full text-xs font-bold text-neutral-700">
                                    {dueDate}
                                </div>
                            </div>
                        )}

                        {/* Subtask Progress Section */}
                        {type === "subtask" && (
                            <div className="mt-4">
                                <h3 className="text-sm font-bold text-neutral-700 mb-2">
                                    Progress: {progress}%
                                </h3>
                                <div className="w-full h-4 bg-gray-200 rounded-full">
                                    <div
                                        className={`h-full rounded-full ${
                                            progress > 0 ? "bg-yellow-500" : "bg-gray-400"
                                        }`}
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Layer 4: Priority and EXP */}
                        <div className="flex justify-between items-center mt-4">
                            {/* Priority */}
                            <div className="w-16 h-9 bg-yellow-300 rounded-lg flex items-center justify-center">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(4)].map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-3 h-3 rounded-full ${
                                                index < priority ? "bg-yellow-500" : "bg-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            {/* Level Badge and EXP */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={SwordShieldIcon}
                                    alt="Level Badge"
                                    className="w-6 h-6"
                                />
                                <div className="text-neutral-700 text-sm font-bold">
                                    {xp.toString().padStart(3, "0")} EXP
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                {showForm && (
                    <AddQuestForm
                        onSubmit={handleEditSubmit}
                        onClose={() => setShowForm(false)}
                        initialData={{
                            name,
                            category,
                            goal,
                            dueDate,
                            xp,
                            daysLeft,
                            priority,
                            status,
                            progress, // Pass progress to the edit form
                        }}
                        isSubtask={type === "subtask"}
                    />
                )}
            </>
        );
    }

    return null;
};

QuestBoard.propTypes = {
    type: PropTypes.oneOf(["default", "add", "subtask"]),
    level: PropTypes.number,
    daysLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    category: PropTypes.string,
    goal: PropTypes.string,
    dueDate: PropTypes.string,
    xp: PropTypes.number,
    priority: PropTypes.number,
    status: PropTypes.string,
    onAddQuest: PropTypes.func,
    onDeleteQuest: PropTypes.func,
    onEditQuest: PropTypes.func,
    onChangeStatus: PropTypes.func,
};

export default QuestBoard;