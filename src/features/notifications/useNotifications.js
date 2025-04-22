import { useState, useEffect } from 'react';

const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [alerts, setAlerts] = useState([]);

    // Fetch notifications from an API or data source
    const fetchNotifications = async () => {
        try {
            const response = await fetch('/api/notifications'); // Replace with your API endpoint
            const data = await response.json();
            setNotifications(data);
            calculateUnreadCount(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    // Mark a notification as read
    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    // Calculate unread notifications count
    const calculateUnreadCount = (notifications) => {
        const count = notifications.filter((notification) => !notification.read).length;
        setUnreadCount(count);
    };

    // Clear all notifications
    const clearNotifications = () => {
        setNotifications([]);
        setUnreadCount(0);
    };

    // Schedule a reminder for a notification
    const scheduleReminder = (id, time) => {
        const notification = notifications.find((n) => n.id === id);
        if (notification) {
            setTimeout(() => {
                alert(`Reminder: ${notification.message}`);
            }, time);
        }
    };

    // Trigger an alert for a notification
    const triggerAlert = (id) => {
        const notification = notifications.find((n) => n.id === id);
        if (notification) {
            setAlerts((prev) => [...prev, notification]);
            alert(`Alert: ${notification.message}`);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        calculateUnreadCount(notifications);
    }, [notifications]);

    return {
        notifications,
        unreadCount,
        markAsRead,
        clearNotifications,
        scheduleReminder,
        triggerAlert,
        alerts,
    };
};

export default useNotifications;