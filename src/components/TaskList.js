import axios from "axios";
import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskList = ({ tasks, setTasks }) => {
    // gets the task list once the component is mounted
    useEffect(() => {
        getTasks();
    }, []);

    // get all tasks
    const getTasks = async () => {
        try {
            const response = await axios.get("http://localhost:3100/getTasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error");
        }
    };

    // update a task by its id
    const updateTask = async (id, isDone) => {
        try {
            await axios.put(`http://localhost:3100/update/${id}`, {
                isDone: isDone,
            });
        } catch (error) {
            console.error("Error");
        }
    };

    // delete a task by its id
    const deleteTask = async (id) => {
        console.log(id);
        try {
            await axios.delete(`http://localhost:3100/delete/${id}`);
        } catch (error) {
            console.error("Error");
        }
    };

    // this function is called when clicking on the checkbox
    const handleCheck = (index) => {
        const newTasks = [...tasks];
        // this condition allows to modify the value of 'isDone' key
        if (newTasks[index].isDone === true) {
            newTasks[index].isDone = false;
        } else {
            newTasks[index].isDone = true;
        }
        /* 'updateTask()' updates the status of the tasks in database
        1st param : task to update
        2nd param : status to update (done / not done) */
        updateTask(newTasks[index]._id, newTasks[index].isDone);
        // updates the task list
        setTasks(newTasks);
    };

    // this function is called when clicking on the trash can icon
    const handleRemove = (index) => {
        const newTasks = [...tasks];
        // 'deleteTask()' deletes a task in the database by its id
        deleteTask(newTasks[index]._id);
        // the 'splice()' method removes items from an array - removes a item of the task list
        newTasks.splice(index, 1);
        // updates the task list (without the removed item)
        setTasks(newTasks);
    };

    return (
        <ul>
            {
                // if there's at least one task in the 'tasks' array...
                tasks.length > 0 &&
                    // ...map() will return as many tasks as there are elements in 'tasks' array
                    tasks.map((task, index) => {
                        return (
                            <li key={index}>
                                <input
                                    className="input-checkbox"
                                    type="checkbox"
                                    checked={
                                        // this condition checks if a task is done or not
                                        task.isDone ? true : false
                                    }
                                    onChange={() => handleCheck(index)}
                                />

                                <FontAwesomeIcon
                                    icon="trash-alt"
                                    className="trash-alt"
                                    size="1x"
                                    onClick={() => handleRemove(index)}
                                ></FontAwesomeIcon>

                                <span
                                    className={
                                        // this condition checks if a task is done or not and if it's done, adds a line through it
                                        `text ${task.isDone ? "done" : ""}`
                                    }
                                >
                                    {task.title}
                                </span>
                            </li>
                        );
                    })
            }
        </ul>
    );
};

export default TaskList;
