import React from 'react';
import useReminders from '../features/notifications/useReminders';

const NotificationBell = () => {
    const { reminders, markAsRead } = useReminders();

    const unreadCount = reminders.filter(reminder => !reminder.read).length;

    const handleBellClick = () => {
        // Handle the bell click, e.g., show a dropdown or modal
        console.log('Bell clicked');
    };

    return (
        <div className="notification-bell" onClick={handleBellClick}>
            <i className="bell-icon">🔔</i>
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </div>
    );
};

export default NotificationBell;
