import React, {  useState } from 'react'

interface Task {
     id:number;
     text:string;
     completed:boolean;
}

const TodoList:React.FC=()=> {
    const[nextId, setNextId]=useState<number>(1);
    const [ tasks,setTasks] = useState<Task[]>([]);
    const [taskText,setTaskText] = useState<string>("");
    const [editTaskId,setEditTaskId] = useState<number| null>(null);
     const handleAdd = ()=>{
        if(taskText.trim()===""){
            return;
        }

        const newTask : Task = {
            id: nextId,
            text:taskText,
            completed:false,
        }
        setTasks([...tasks,newTask]);
        setTaskText("");
        setNextId(nextId+1);
     };
     const edit = (id:number)=>{
        const taskToEdit = tasks.find((task)=>task.id===id);
        if(taskToEdit){
            setTaskText(taskToEdit.text);
            setEditTaskId(id);
        }
     }
     const save = ()=>{
        if(editTaskId && taskText.trim()!==""){
            setTasks(
                tasks.map((task)=>(
                    task.id===editTaskId ? {...task,text:taskText} : task
                ))
            );
            setTaskText("");
            setEditTaskId(null);
        }
     };
     const cancelEdit = ()=>{
        setTaskText ("");
        setEditTaskId(null);
     }
     const handleComplete = (id:number)=>{
        setTasks(
            tasks.map((task)=>(
                task.id===id ? {...task , completed: !task.completed} : task
            )));
     };
     const handleDelete = (id:number) =>{
        setTasks(tasks.filter((task)=> task.id!==id));
     }
  return (
    <div style={{textAlign:"center",marginTop:"20px"}}>
        <h1>To-Do List</h1>
        <div>
            <input 
             type='text'
             value={taskText}
             onChange={(e)=> setTaskText(e.target.value)}
             placeholder='Add a new Task'
             style={{padding:"5px", marginRight:"5px"}}
            />
            {editTaskId ?(
            <>
            <button onClick={save} style={{padding:"5px 10px"}}>Save</button>
            <button onClick={cancelEdit} style={{padding:"5px 10px", marginLeft:"10px"}}>Cancel</button>
            </>)
            :(<button onClick={handleAdd} style={{padding:"5px 10px"}}>Add Task</button>)
            }
        </div>
        <ul style={{listStyleType:"none" , padding:0, marginTop:"20px"}}>
            {tasks.map((task)=>(
                <li key={task.id}
                style={{
                    marginBottom:"10px",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                <span  
                style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}>
                {task.text}
                 <button onClick={()=>handleComplete(task.id)}  style={{
                        marginLeft: "10px",
                        background: "green",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}>Complete</button>
                </span>
                <button onClick={()=>edit(task.id)}
                    style={{
                        marginLeft:"10px",
                        background:"blue",
                        color:"white",
                        border:"none",
                        padding:"5px 10px",
                        cursor:"pointer"
                    }}>Edit</button>
                <button onClick={()=> handleDelete(task.id)}
                    style={{
                        marginLeft: "10px",
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}>
                Delete
                </button>
                </li>
            ))}
        </ul>
      
    </div>
  )
};

export default TodoList
