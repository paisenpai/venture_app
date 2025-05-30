import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import SwordShieldIcon from "../../../assets/icons/SwordShield.png";
import MenuPortal from "../../ui/MenuPortal";
import {
  getDaysLeftStyle,
  formatDate,
} from "../../../utils/QuestBoard/listViewUtils";

const SubtaskItem = ({ item, onEdit, onDelete, onChangeStatus }) => {
  const [showActions, setShowActions] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // Memoize computed values
  const isOverdue = useMemo(
    () => item.status !== "completed" && item.daysLeft < 0,
    [item.status, item.daysLeft]
  );

  const daysLeftStyle = useMemo(
    () => getDaysLeftStyle(item.daysLeft),
    [item.daysLeft]
  );

  // Optimize handlers with useCallback
  const handleMouseEnter = useCallback(() => setShowActions(true), []);
  const handleMouseLeave = useCallback(() => setShowActions(false), []);
  const handleStatusChange = useCallback(
    (e) => onChangeStatus(e.target.value),
    [onChangeStatus]
  );

  // Add toggle menu function with positioning
  const toggleMenu = useCallback(() => {
    if (!showMenu && menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right - 160 + window.scrollX,
      });
    }
    setShowMenu((prev) => !prev);
  }, [showMenu]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showMenu &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      className="ml-8 pl-4 border-l-2 border-gray-200 py-3 hover:bg-gray-50 transition-colors rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          {/* Title */}
          <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>

          {/* Days left & deadline */}
          <div className="flex items-center gap-2 text-xs">
            {item.daysLeft !== null && (
              <span
                className="px-2 py-1 rounded-full"
                style={{
                  backgroundColor: daysLeftStyle.bg,
                  color: daysLeftStyle.color,
                }}
              >
                {isOverdue
                  ? `${Math.abs(item.daysLeft)}d Overdue`
                  : item.daysLeft === 0
                  ? "Due Today"
                  : `${item.daysLeft}d Left`}
              </span>
            )}
            <span className="text-gray-500">{formatDate(item.dueDate)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Status dropdown */}
          <select
            value={item.status}
            onChange={handleStatusChange}
            className="text-xs border border-gray-200 rounded px-2 py-1"
          >
            <option value="available">Pending</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>

          {/* Priority stars */}
          <div className="bg-yellow-100 px-2 py-1 rounded-md flex items-center">
            {Array.from({ length: Math.min(item.priority || 1, 4) }).map(
              (_, i) => (
                <span key={i} className="text-yellow-500 text-xs">
                  ★
                </span>
              )
            )}
          </div>

          {/* XP value */}
          <div className="flex items-center gap-1">
            <img src={SwordShieldIcon} alt="XP" className="w-4 h-4" />
            <span className="text-xs font-medium">{item.xp} XP</span>
          </div>

          {/* Settings button */}
          <button
            ref={menuButtonRef}
            onClick={toggleMenu}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Subtask options"
            aria-expanded={showMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Portal-based menu */}
      <MenuPortal isOpen={showMenu}>
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            zIndex: 1000,
          }}
          className="w-48 bg-white rounded-md shadow-lg border border-gray-200"
        >
          <div className="py-1">
            <button
              onClick={() => {
                onEdit();
                setShowMenu(false);
              }}
              className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="w-4 h-4 mr-2 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <span>Edit</span>
            </button>

            <button
              onClick={() => {
                onDelete();
                setShowMenu(false);
              }}
              className="flex w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <svg
                className="w-4 h-4 mr-2 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </MenuPortal>
    </div>
  );
};

SubtaskItem.propTypes = {
  item: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
};

export default SubtaskItem;
