import axios from "axios";

const TaskForm = ({ input, setInput, tasks, setTasks }) => {
    // this function allows the app to commucate with the server and create a new task in the database
    const createTask = async () => {
        try {
            // 'axios' sends the request to the server
            const response = await axios.post("http://localhost:3100/create", {
                title: input,
                isDone: false,
            });
            return response.data._id;
        } catch (error) {
            console.error("Error");
        }
    };

    // this function handle what the user types in the input field
    const handleInput = (event) => {
        const value = event.target.value;
        setInput(value);
    };

    // this function is called when clicking on the "add task" button
    const handleSubmit = async (event) => {
        // prevent page refresh
        event.preventDefault();
        // if there's no new task entered in the input...
        if (!input) {
            // ...displays an alert
            alert("Please enter a new task");
        } else {
            // 'createTask()' adds a new task to the database
            const _id = await createTask();
            // this line creates a copy of 'tasks' array...
            const newTasks = [...tasks];
            // ...and adds a new task to 'newTasks'
            newTasks.push({ _id: _id, title: input, isDone: false });
            // updates the task list
            setTasks(newTasks);
            // clears the input field
            setInput("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="input-form"
                type="text"
                placeholder="New task"
                value={input}
                onChange={handleInput}
            />
            <button className="add-btn" type="submit">
                Add task
            </button>
        </form>
    );
};

export default TaskForm;
