import "./App.css";
import React, { useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faListAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faListAlt, faTrashAlt);

const App = () => {
    // this state will store what the user types in the input field
    const [input, setInput] = useState("");

    // this state will store a list of tasks
    const [tasks, setTasks] = useState([]);
    console.log(tasks);
    return (
        <>
            <Header />
            <main className="app-container">
                <section className="first-section">
                    <TaskList tasks={tasks} setTasks={setTasks} />
                </section>

                <section className="last-section">
                    <TaskForm
                        input={input}
                        setInput={setInput}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                </section>
            </main>
            <Footer />
        </>
    );
};

export default App;
