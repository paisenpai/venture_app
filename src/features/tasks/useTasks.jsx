import { useState, useEffect } from 'react';
import axios from 'axios';

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch tasks
    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add a new task
    const addTask = async (newTask) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/tasks', newTask);
            setTasks((prevTasks) => [...prevTasks, response.data]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete a task
    const deleteTask = async (taskId) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`/api/tasks/${taskId}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        deleteTask,
    };
};

export default useTasks;