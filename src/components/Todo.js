import React, { useState } from 'react';

export default function Todo() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingTaskIndex, setEditingTaskIndex] = useState(null); 

    const addTask = () => {
        if (newTask.trim() !== '') {
            if (editingTaskIndex !== null) {
                const updatedTasks = [...tasks];
                updatedTasks[editingTaskIndex] = { ...updatedTasks[editingTaskIndex], text: newTask };
                setTasks(updatedTasks);
                setEditingTaskIndex(null); 
            } else {
                setTasks([...tasks, { text: newTask, complete: false }]);
            }
            setNewTask('');
        }
    };

    const removeTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const completeTask = (index) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index] = {
                ...updatedTasks[index],
                complete: !updatedTasks[index].complete
            };
            return updatedTasks;
        });
    };

    const editTask = (index) => {
        setEditingTaskIndex(index);
        setNewTask(tasks[index].text);
    };

    const cancelEdit = () => {
        setEditingTaskIndex(null);
        setNewTask('');
    };

    return (
        <div>
            <h1>ToDo List</h1>
            <div>
                <input
                    type='text'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask}>{editingTaskIndex !== null ? 'Save Changes' : 'Add Task'}</button>
                {editingTaskIndex !== null && (
                    <button onClick={cancelEdit}>Cancel</button>
                )}
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className={task.complete ? 'completed' : 'not-completed'}
                    >
                        {editingTaskIndex === index ? (
                            <input
                                type='text'
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        ) : (
                            task.text
                        )}
                        <button onClick={() => completeTask(index)}>Mark as Complete</button>
                        <button onClick={() => editTask(index)}>Edit</button>
                        <button onClick={() => removeTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


