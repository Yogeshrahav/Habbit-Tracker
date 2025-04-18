import './App.css';

const Task = (props) => {
    return ( 
    <div className="task-component">
        <h1>{props.taskName}</h1>
        <button onClick={() => props.deleteTask(props.id)}> Clear </button>
        <button> Edit </button>
    </div>
      );
}
export default Task;