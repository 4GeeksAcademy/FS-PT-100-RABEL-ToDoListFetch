import React from "react";

const TodoItem =({ task, id, handleDelete}) => {

    return(

        <li className="list-group-item d-flex justify-content-between align-items-center">
          
          {task}
          
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(id)}
        >
          ✖  
        </button>    
        </li>
    );
};

export default TodoItem;