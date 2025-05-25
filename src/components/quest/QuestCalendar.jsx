import React, { useState } from "react";
import Calendar from "react-calendar"; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Import default styles for react-calendar
import PropTypes from "prop-types";

const QuestCalendarView = ({ quests }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Group quests by their due dates
    const questsByDate = quests.reduce((acc, quest) => {
        acc[quest.dueDate] = acc[quest.dueDate] || [];
        acc[quest.dueDate].push(quest);
        return acc;
    }, {});

    // Styles
    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f3f4f6",
            fontFamily: "'Inter', sans-serif",
            padding: "16px",
        },
        calendarFrame: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "900px",
            height: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
        },
        header: {
            padding: "20px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        monthYear: {
            fontSize: "24px",
            fontWeight: "bold",
            color: "#1f2937",
        },
        calendar: {
            width: "100%",
            border: "none",
            fontFamily: "'Inter', sans-serif",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "16px",
        },
        navigation: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
        },
        navigationButton: {
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
        },
        navigationButtonHover: {
            backgroundColor: "#3b41c5",
        },
        weekdays: {
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#4b5563",
            marginBottom: "8px",
        },
        tile: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px",
            minHeight: "100px",
            transition: "background-color 0.3s ease",
        },
        tileNow: {
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            borderRadius: "8px",
        },
        tileActive: {
            backgroundColor: "#e0e7ff",
            color: "#4f46e5",
            borderRadius: "8px",
        },
        tileHover: {
            backgroundColor: "#f3f4f6",
        },
        taskList: {
            marginTop: "8px",
            width: "100%",
            textAlign: "center",
        },
        task: {
            backgroundColor: "#e0e7ff",
            color: "#4f46e5",
            fontSize: "12px",
            borderRadius: "8px",
            padding: "4px 8px",
            marginBottom: "4px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
        },
    };

    // Custom tile content for react-calendar
    const tileContent = ({ date }) => {
        const dateString = date.toISOString().split("T")[0];
        const tasks = questsByDate[dateString] || [];

        return (
            <div style={styles.taskList}>
                {tasks.map((task) => (
                    <div key={task.id} style={styles.task}>
                        {task.name}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.calendarFrame}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.monthYear}>
                        {selectedDate.toLocaleString("default", { month: "long" })} {selectedDate.getFullYear()}
                    </h1>
                </div>

                {/* React Calendar */}
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileContent={tileContent} // Add tasks to the calendar tiles
                    className="custom-calendar" // Add a custom class for additional styling
                    tileClassName={({ date, view }) => {
                        const dateString = date.toISOString().split("T")[0];
                        if (questsByDate[dateString]) {
                            return "has-task";
                        }
                        return null;
                    }}
                />
            </div>
        </div>
    );
};

QuestCalendarView.propTypes = {
    quests: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            dueDate: PropTypes.string.isRequired,
            goal: PropTypes.string,
        })
    ).isRequired,
};

export default QuestCalendarView;