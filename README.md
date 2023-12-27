## src/components/Todo.js

```js
import React, { useState } from 'react';

// Define a functional component called Todo
const Todo = () => {
    // State variables using the useState hook
    const [tasks, setTasks] = useState([]);  // to store the list of tasks
    const [newTask, setNewTask] = useState('');  // to store the input value for a new task

    // Function to add a new task to the list
    const addTask = () => {
        // Check if the new task is not an empty string
        if (newTask.trim() !== '') {
            // Update the tasks state with a new task object (text and complete properties)
            setTasks([...tasks, { text: newTask, complete: false }]);
            // Reset the input value for a new task
            setNewTask('');
        }
    };

    // Function to remove a task from the list by its index
    const removeTask = (index) => {
        // Create a copy of the tasks array
        const updatedTasks = [...tasks];
        // Remove the task at the specified index
        updatedTasks.splice(index, 1);
        // Update the tasks state with the modified array
        setTasks(updatedTasks);
    };

    // Function to toggle the completion status of a task
    const completeTask = (index) => {
        setTasks((prevTasks) => {
            // Create a copy of the tasks array
            const updatedTasks = [...prevTasks];
            // Toggle the complete status of the task at the specified index
            updatedTasks[index] = {
                ...updatedTasks[index],
                complete: !updatedTasks[index].complete
            };
            // Update the tasks state with the modified array
            return updatedTasks;
        });
    };

    // JSX representing the Todo component
    return (
        <div>
            <h1>ToDo List</h1>
            <div>
                {/* Input field for entering a new task */}
                <input 
                    type='text'
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)}
                />
                {/* Button to add a new task */}
                <button onClick={addTask}>Add Task</button>
            </div>
            {/* List of tasks */}
            <ul>
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        // Apply a CSS class based on the completion status of the task
                        className={task.complete ? 'completed' : 'not-completed'}
                    >
                        {/* Display the task text */}
                        {task.text}
                        {/* Button to toggle the completion status of the task */}
                        <button onClick={() => completeTask(index)}>Mark as Complete</button>
                        {/* Button to remove the task */}
                        <button onClick={() => removeTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Export the Todo component for use in other parts of the application
export default Todo;

```
## .trim()

The .trim() function is a method in JavaScript that is used to remove whitespace (spaces, tabs, and newlines) from both ends of a string. Whitespace refers to any character that is used for spacing, but it does not include non-breaking space characters.

```js
const exampleString = "   Hello, world!   ";
const trimmedString = exampleString.trim();
console.log(trimmedString);  // Output: "Hello, world!"
```

In the context of the ToDo list, newTask.trim() !== '' is used to check if the input for a new task is not just composed of whitespace. If the trimmed input is an empty string after removing whitespace, it means the input consists only of spaces, tabs, or newlines, and it is considered as an empty input. In that case, the condition evaluates to false, and the task is not added to the list. This ensures that users cannot add tasks that only consist of whitespace.

## Spread Operator

The spread operator (...) in JavaScript is used for expanding elements from arrays or properties from objects. In the context of the ToDo list code you provided, the spread operator is used in a couple of places to create copies of arrays while making modifications.

Adding a New Task:

```js
setTasks([...tasks, newTask]);
```

Here, ...tasks is the spread operator, and it is used to create a new array that contains all the elements from the existing tasks array. The newTask is then added to this new array. This approach ensures that the original tasks array remains unchanged, and the state is updated with a new array containing the previous tasks along with the new one.

Removing a Task:

```js
const updatedTasks = [...tasks];
```

In the removeTask function, a copy of the tasks array is created using the spread operator. This copy (updatedTasks) is then modified (using splice) to remove the task at the specified index. Again, this ensures that the state is updated with a new array, preserving the immutability of the original tasks array.

Using the spread operator in this way is a common practice in React and other JavaScript applications, as it helps avoid directly mutating the state. Immutability is important in React because it helps in efficient state management and enables better tracking of changes for performance optimizations like shouldComponentUpdate or React's memoization features.






