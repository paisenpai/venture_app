// Improve equality checks and status change function

import { useState, useCallback } from "react";

// Simple ID generator function to replace uuid
const generateId = () => {
  return "q" + Date.now() + "-" + Math.random().toString(36).substring(2, 9);
};

// Helper function to calculate days left (duplicating from Quests.jsx for encapsulation)
const calculateDaysLeft = (dueDate) => {
  if (!dueDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

// Sample initial quest data for testing
const initialQuestData = [
  {
    id: "q1",
    name: "Complete Project Documentation",
    category: "Work",
    goal: "Write comprehensive docs for the API",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 7 days from now
    xp: 250,
    priority: 3,
    status: "available",
    progress: 0,
    daysLeft: 7,
    subtasks: [
      {
        id: "st1-1",
        name: "API Endpoints Documentation",
        category: "Subtask",
        goal: "Document all API endpoints",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 3 days from now
        xp: 60,
        priority: 2,
        status: "available",
        progress: 0,
        daysLeft: 3,
      },
      {
        id: "st1-2",
        name: "Data Models Documentation",
        category: "Subtask",
        goal: "Document all data models",
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 5 days from now
        xp: 60,
        priority: 2,
        status: "available",
        progress: 0,
        daysLeft: 5,
      },
    ],
  },
  {
    id: "q2",
    name: "Learn React Hooks",
    category: "Learning",
    goal: "Master all essential React hooks",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 14 days from now
    xp: 300,
    priority: 2,
    status: "ongoing",
    progress: 45,
    daysLeft: 14,
    subtasks: [
      {
        id: "st2-1",
        name: "useState & useEffect",
        category: "Subtask",
        goal: "Learn basic hooks",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 2 days from now
        xp: 75,
        priority: 3,
        status: "completed",
        progress: 100,
        daysLeft: 2,
      },
      {
        id: "st2-2",
        name: "useContext & useReducer",
        category: "Subtask",
        goal: "Learn advanced hooks",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 7 days from now
        xp: 75,
        priority: 2,
        status: "ongoing",
        progress: 35,
        daysLeft: 7,
      },
      {
        id: "st2-3",
        name: "Custom Hooks",
        category: "Subtask",
        goal: "Learn to create custom hooks",
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 12 days from now
        xp: 75,
        priority: 1,
        status: "available",
        progress: 0,
        daysLeft: 12,
      },
    ],
  },
  {
    id: "q3",
    name: "Daily Exercise Routine",
    category: "Health",
    goal: "30 minutes exercise daily",
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 2 days ago (overdue)
    xp: 100,
    priority: 4,
    status: "available",
    progress: 0,
    daysLeft: -2,
    subtasks: [],
  },
  {
    id: "q4",
    name: "Read Design Patterns Book",
    category: "Learning",
    goal: "Finish the book and practice examples",
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 30 days from now
    xp: 350,
    priority: 1,
    status: "available",
    progress: 0,
    daysLeft: 30,
    subtasks: [],
  },
  {
    id: "q5",
    name: "Weekly Team Meeting",
    category: "Work",
    goal: "Prepare slides and agenda",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 1 day from now
    xp: 150,
    priority: 3,
    status: "ongoing",
    progress: 75,
    daysLeft: 1,
    subtasks: [
      {
        id: "st5-1",
        name: "Create Presentation",
        category: "Subtask",
        goal: "Create slides for meeting",
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 1 day from now
        xp: 50,
        priority: 3,
        status: "completed",
        progress: 100,
        daysLeft: 1,
      },
      {
        id: "st5-2",
        name: "Prepare Agenda",
        category: "Subtask",
        goal: "List topics to discuss",
        dueDate: new Date(Date.now()).toISOString().split("T")[0], // Today
        xp: 30,
        priority: 4,
        status: "ongoing",
        progress: 50,
        daysLeft: 0,
      },
    ],
  },
  {
    id: "q6",
    name: "Build Personal Website",
    category: "Personal",
    goal: "Create portfolio website",
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 21 days from now
    xp: 400,
    priority: 2,
    status: "completed",
    progress: 100,
    daysLeft: 21,
    subtasks: [
      {
        id: "st6-1",
        name: "Design Homepage",
        category: "Subtask",
        goal: "Create homepage mockup",
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 5 days ago
        xp: 100,
        priority: 3,
        status: "completed",
        progress: 100,
        daysLeft: -5,
      },
      {
        id: "st6-2",
        name: "Implement Projects Section",
        category: "Subtask",
        goal: "Add portfolio projects",
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 2 days ago
        xp: 120,
        priority: 2,
        status: "completed",
        progress: 100,
        daysLeft: -2,
      },
      {
        id: "st6-3",
        name: "Deploy to GitHub Pages",
        category: "Subtask",
        goal: "Make website live",
        dueDate: new Date(Date.now()).toISOString().split("T")[0], // Today
        xp: 80,
        priority: 1,
        status: "completed",
        progress: 100,
        daysLeft: 0,
      },
    ],
  },
];

const useQuestHandlers = (initialQuests = initialQuestData) => {
  const [quests, setQuests] = useState(initialQuests);

  // Add a new quest
  const handleAddQuest = useCallback((questData) => {
    const newQuest = {
      id: generateId(), // Using our custom generator instead of uuidv4
      ...questData,
      subtasks: [],
    };
    setQuests((prev) => [...prev, newQuest]);
  }, []);

  // Edit an existing quest
  const handleEditQuest = useCallback((questId, questData) => {
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.id === questId) {
          return {
            ...quest,
            ...questData,
            subtasks: quest.subtasks,
          };
        }
        return quest;
      })
    );
  }, []);

  // Delete a quest
  const handleDeleteQuest = useCallback((questId) => {
    setQuests((prev) => prev.filter((quest) => quest.id !== questId));
  }, []);

  // Change quest status
  const handleChangeStatus = useCallback((questId, newStatus) => {
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.id === questId) {
          const progress = newStatus === "completed" ? 100 : quest.progress;
          return {
            ...quest,
            status: newStatus,
            progress,
          };
        }
        return quest;
      })
    );
  }, []);

  // Add subtask to a quest
  const handleAddSubtask = useCallback((parentId, subtaskData) => {
    const subtask = {
      id: "st" + generateId(), // Using our custom generator with 'st' prefix
      ...subtaskData,
    };

    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.id === parentId) {
          return {
            ...quest,
            subtasks: [...(quest.subtasks || []), subtask],
          };
        }
        return quest;
      })
    );
  }, []);

  // Edit a subtask
  const handleEditSubtask = useCallback((parentId, subtaskId, subtaskData) => {
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.id === parentId) {
          const updatedSubtasks = quest.subtasks.map((subtask) => {
            if (subtask.id === subtaskId) {
              return {
                ...subtask,
                ...subtaskData,
              };
            }
            return subtask;
          });
          return {
            ...quest,
            subtasks: updatedSubtasks,
          };
        }
        return quest;
      })
    );
  }, []);

  // Delete a subtask
  const handleDeleteSubtask = useCallback((parentId, subtaskId) => {
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.id === parentId) {
          return {
            ...quest,
            subtasks: quest.subtasks.filter(
              (subtask) => subtask.id !== subtaskId
            ),
          };
        }
        return quest;
      })
    );
  }, []);

  // Change subtask status
  const handleChangeSubtaskStatus = useCallback(
    (parentId, subtaskId, newStatus) => {
      setQuests((prev) =>
        prev.map((quest) => {
          if (quest.id === parentId) {
            const updatedSubtasks = quest.subtasks.map((subtask) => {
              if (subtask.id === subtaskId) {
                return {
                  ...subtask,
                  status: newStatus,
                  progress: newStatus === "completed" ? 100 : subtask.progress,
                };
              }
              return subtask;
            });

            // Calculate overall quest progress based on subtasks
            const completedSubtasks = updatedSubtasks.filter(
              (s) => s.status === "completed"
            ).length;
            const progress =
              updatedSubtasks.length > 0
                ? Math.round((completedSubtasks / updatedSubtasks.length) * 100)
                : quest.progress;

            return {
              ...quest,
              subtasks: updatedSubtasks,
              progress,
            };
          }
          return quest;
        })
      );
    },
    []
  );

  // Update quest progress directly
  const updateQuestProgress = useCallback((questId, progress) => {
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.id === questId) {
          return {
            ...quest,
            progress,
          };
        }
        return quest;
      })
    );
  }, []);

  return {
    quests,
    handleAddQuest,
    handleEditQuest,
    handleDeleteQuest,
    handleChangeStatus,
    handleAddSubtask,
    handleEditSubtask,
    handleDeleteSubtask,
    handleChangeSubtaskStatus,
    updateQuestProgress,
  };
};

export default useQuestHandlers;
