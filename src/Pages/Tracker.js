import React, { useState } from "react";
// import "./HabitTracker.css"; // Create this for styling

const Tracker = () => {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [habitDate, setHabitDate] = useState("");

  const addHabit = () => {
    if (habitName && habitDate) {
      const newHabit = {
        id: Date.now(),
        name: habitName,
        date: habitDate,
      };
      setHabits([...habits, newHabit]);
      setHabitName("");
      setHabitDate("");
    } else {
      alert("Please enter both name and date.");
    }
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const editHabit = (id) => {
    const newName = prompt("Enter new habit name:");
    if (newName) {
      const updatedHabits = habits.map((habit) =>
        habit.id === id ? { ...habit, name: newName } : habit
      );
      setHabits(updatedHabits);
    }
  };

  return (
    <div className="habit-container">
      <h1>Habit Tracker</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter habit name"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
        <input
          type="date"
          value={habitDate}
          onChange={(e) => setHabitDate(e.target.value)}
        />
        <button onClick={addHabit}>Add Habit</button>
      </div>

      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            <span>
              <strong>{habit.name}</strong> - {habit.date}
            </span>
            <div className="actions">
              <button onClick={() => editHabit(habit.id)}>Edit</button>
              <button onClick={() => deleteHabit(habit.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tracker;
