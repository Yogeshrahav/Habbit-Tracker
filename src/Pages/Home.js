import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Pages/Home.css';

const Home = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/habits", {
          withCredentials: true,
        });
        console.log(response.data)
        if (response.status === 200) {
          setHabits(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch habits", error);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div className='Container'>
      <h4>Welcome! Let's find and enhance your daily habit now</h4>
      <div className="habit-list">
        {habits.map((habit) => (
          <div key={habit.id} className="habit-item">
            <strong>{habit.type}</strong> {habit.date && `- ${habit.date}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
