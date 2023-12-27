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
      <div className='main-body'>
        <h1 className='app-header'>What would you like to get done today?</h1>
        <div className='input-container'>
          <input
            type='text'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className='task-input'
						/>
          <button 
            className='form-btn'
            id='add-task-btn' 
            onClick={addTask}
						>
            {editingTaskIndex !== null ? 'Save Changes' : 'Add Task'}
          </button>
          	{editingTaskIndex !== null && (
							<button
							onClick={cancelEdit}
							className='form-btn'
							id='cancel-edit-btn'
							>
            Cancel
          </button>
            )}
        </div>
        <ul className='task-list'>
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
							className='edit-input'
							/>
							) : (
								task.text
								)}
            <button 
							onClick={() => completeTask(index)}
							className='task-btn'
							>
								Mark as Complete
						</button>
            <button 
							onClick={() => editTask(index)}
							className='task-btn'
							>
								Edit
						</button>
            <button 
							onClick={() => removeTask(index)}
							className='task-btn'
						>
								Delete
						</button>
          </li>
          ))}
        </ul>
      </div>
    );
};


