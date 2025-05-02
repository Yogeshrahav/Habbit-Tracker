import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import '../Pages/Tracker.css'
import NaviBar from './NaviBar';
import { loadHabits } from '../Component/localStorage';

const App = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [habitDate, setHabitDate] = useState("");

  useEffect(() => {
    const fetchHabits = async () => {
      const habits = await loadHabits();
      setItems(habits);
    };
  
    fetchHabits();
  }, []);

  const handleAdd = async () => {
    if (input !== "") {
      const newHabit = {
        type: input,
        date: habitDate,
        done: false,
      }
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await axios.post(
      "http://localhost:8080/api/habits",
       newHabit,
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      withCredentials:true,

    });

    if (response.status === 200 || response.status === 201) {
      setItems([...items, { ...newHabit, edit: false }]);
      setInput("");
      setHabitDate("");
    } else {
      alert("Failed to add habit to backend");
    }
  } catch (error) {
    console.error("Error adding habit:", error);
    alert("Something went wrong while saving habit.");
  }
  }
};

const handleEdit = async (index) => {
  const updatedItems = [...items];
  const item = updatedItems[index];

  if (!item.edit) {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:8080/api/habits/${item.id}`,
        {
          type: item.type,
          date: item.date,
          done: item.done,
          edit: false
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        updatedItems[index] = { ...response.data, edit: false };
        setItems(updatedItems);
      } else {
        alert("Failed to update habit");
      }
    } catch (error) {
      console.log("Error updating habit", error);
    }
  } else {
    updatedItems[index].edit = true;
    setItems(updatedItems);
  }
};


  const handleTextChange = (index, value) => {
    const newItems = [...items];
    newItems[index].type = value;
    setItems(newItems);
  };
  const handleDelete = async(index) => {
    const habitId = items[index].id;
    try{
      const token = sessionStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/habits/${habitId}`,{
        headers:{
          Authorization: `Bearer ${token}`
        },
        withCredentials:true,
      })
      const newItems = items.filter((_, i) => i !==index);
      setItems(newItems);
    } catch(error){
      console.log("Error deleting habit", error);
      alert("Failed to delete habit")
    }
  };
  const toggleDone = async (index) => {
    const updatedItems = [...items];
    updatedItems[index].done = !updatedItems[index].done;
    const token = sessionStorage.getItem("token");

    try{
      const response = await axios.put(`http://localhost:8080/api/habits/${updatedItems[index].id}`,{
        ...updatedItems[index],
      },{
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials:true,
      }); 
      if(response.status === 200){
        updatedItems[index] = {...response.data, edit:false};
        setItems(updatedItems)
      }
    } catch(error){
      console.log("Failed to Update the habit", error)
    }

  };
  

  return (
    <div>
      <NaviBar />
      <input
        type="text"
        placeholder="Add"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
          type="date"
          value={habitDate}
          onChange={(e) => setHabitDate(e.target.value)}
        />
      <button onClick={handleAdd}>Add</button>

      {items.map((item, index) => (
        <div key={index} style={{ marginTop: '10px' }}>
          {item.edit ? (
            <input
              value={item.type}
              onChange={(e) => handleTextChange(index, e.target.value)}
            />
          ) : (
            <span
              style={{
                color: item.done ? 'green' : 'black',
                textDecoration: item.done ? 'line-through' : 'none',
                fontWeight: item.done ? 'bold' : 'normal'
              }}
            >
              {item.type} {item.date && `- ${item.date}`}
            </span>
          )}
          <button onClick={() => handleEdit(index)} style={{ marginLeft: '10px' }}>
            {item.edit ? "Save" : "Edit"}
          </button><button onClick={()=>handleDelete(index)}> Delete </button>
          <span onClick={() => toggleDone(index)} style={{ cursor: 'pointer' }}>
            {item.done ? (
              <ToggleOnIcon style={{ color: 'green', fontSize:"40px", marginLeft:"2px" }} />
            ) : (
              <ToggleOffIcon style={{ color: 'gray', fontSize:"40px", marginLeft:"2px" }} />
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default App;
