import React, { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const username = "Rabel";
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const fetchTasks = () => {
        fetch(`https://playground.4geeks.com/todo/users/${username}/todos`)
            .then(res => {
                if (!res.ok) throw new Error("Error al obtener tareas");
                return res.json();
            })
            .then(data => setTasks(data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        const initializeUser = async () => {
            try {
                
                const userCheck = await fetch(`https://playground.4geeks.com/todo/users/${username}`);
                
                
                if (userCheck.status === 404) {
                    await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" }
                    });
                    console.log("Usuario creado exitosamente");
                }
                
                
                fetchTasks();
                
            } catch (error) {
                console.error("Error inicializando:", error);
            }
        };
        
        initializeUser();
    }, []);

    const handleAddTask = () => {
        if (!inputValue.trim()) return;

        const newTask = { label: inputValue.trim(), done: false };

        fetch(`https://playground.4geeks.com/todo/users/${username}/todos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al crear tarea");
                return res.json();
            })
            .then(data => {
                setTasks(prev => [...prev, data]);
                setInputValue("");
            })
            .catch(error => console.error("Error:", error));
    };

    const handleDeleteTask = (taskId) => {
        fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al eliminar");
                setTasks(prev => prev.filter(task => task.id !== taskId));
            })
            .catch(error => console.error("Error:", error));
    };

    const handleCleanAll = () => {
        fetch(`https://playground.4geeks.com/todo/users/${username}/todos`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al limpiar");
                setTasks([]);
            })
            .catch(error => console.error("Error:", error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Lista de Tareas de {username}</h1>
            
            <TodoInput
                task={inputValue}
                setTask={setInputValue}
                handleAddTask={handleAddTask}
                handleKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            />

            <ul className="list-group">
                {tasks.length === 0 ? (
                    <li className="list-group-item text-center text-muted">
                        No hay tareas
                    </li>
                ) : tasks.map(task => (
                    <TodoItem 
                        key={task.id}
                        task={task.label}  
                        id={task.id}
                        handleDelete={handleDeleteTask}
                    />
                ))}
            </ul>
            
            <div className="text-center mt-4">
                <button 
                    className="btn btn-warning"
                    onClick={handleCleanAll}
                    disabled={tasks.length === 0}
                >
                    Limpiar todas las tareas
                </button>
                <p className="text-muted mt-2">Total tareas: {tasks.length}</p>
            </div>
        </div>
    );
};

export default TodoList;


    