import React from "react";

const TodoInput = ({ task, setTask, handleKeyDown, handleAddTask }) => {

    return (
        <div className="input-group mb-3">

            <input 
                className="form-control border-0 border-bottom rounded-0" 
                type="text" 
                placeholder="Añadir tarea" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                onKeyDown={handleKeyDown} 
            />
            <button 
                className="btn btn-primary" 
                onClick={handleAddTask}
                disabled={task.trim() === ""}
            >
                Añadir
            </button>
        </div>
    );
};

export default TodoInput;