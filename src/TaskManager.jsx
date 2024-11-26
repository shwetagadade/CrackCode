import React, { useState, useEffect } from "react";
import {  collection,  addDoc,  updateDoc,  deleteDoc,  onSnapshot,  doc,} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "./Config"; 
import { useNavigate } from "react-router-dom";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList); 
    });

    return () => unsubscribe(); 
  }, []);


  const handleAddTask = async () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      try {
        await addDoc(collection(db, "tasks"), newTask);
        setNewTask({ title: "", description: "" }); 
      } catch (error) {
        console.error("Error adding task:", error);
        alert("Failed to add task.");
      }
    } else {
      alert("Both title and description are required!");
    }
  };

  
  const handleUpdateTask = async (id, updatedTask) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, updatedTask);
  };

  
  const handleDeleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  };


  const handleSignOut = async () => {
    try {
      await signOut(auth); 
      navigate("/signup");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };


  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) || 
      task.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="Form">
      <form>
        <h1>TASK MANAGER</h1>
        
        <div>
          <h2>Add New Task</h2>
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <button type="button" onClick={handleAddTask}>
            Add Task
          </button>
        </div>

    
        <div>
          <h2>Search Tasks</h2>
          <input
            type="text"
            placeholder="Search by title or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <h2 className="Taskman">Your Tasks</h2>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="task-buttons">
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateTask(task.id, {
                        ...task,
                        title: task.title + " (Updated)",
                      })
                    }
                  >
                    Update
                  </button>
                  <button type="button" onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks match your search query.</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskManager;
