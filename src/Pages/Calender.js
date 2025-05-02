import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import NaviBar from './NaviBar';
import axios from 'axios';
import { format, parseISO, differenceInDays } from 'date-fns';
import '../Pages/Calender.css';

const Calendar = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/habits', {
          withCredentials: true,
        });
        if (response.status === 200) {
          setHabits(response.data);
        }
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabits();
  }, []);

  
  const doneHabits = habits.filter(h => h.done && h.date).sort((a, b) => new Date(a.date) - new Date(b.date));

  let streakMap = {};
  for (let i = 0; i < doneHabits.length; i++) {
    const curr = parseISO(doneHabits[i].date);
    const prev = i > 0 ? parseISO(doneHabits[i - 1].date) : null;
    const streak = prev && differenceInDays(curr, prev) === 1;
    streakMap[format(curr, 'yyyy-MM-dd')] = streak ? 2 : 1;
  }

  const heatmapData = doneHabits.map(habit => ({
    date: habit.date,
    count: streakMap[format(parseISO(habit.date), 'yyyy-MM-dd')] || 0
  }));

  return (
    <div>
      <NaviBar />
      <h2 className="heatmap-title">Habit Completion Heatmap</h2>
      <CalendarHeatmap
        startDate={new Date(new Date().setDate(new Date().getDate() - 90))}
        endDate={new Date()}
        values={heatmapData}
        classForValue={(value) => {
          if (!value || value.count === 0) return 'color-empty';
          if (value.count === 1) return 'color-scale-1';
          if (value.count === 2) return 'color-scale-2';
          return 'color-empty';
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) return null;
          return {
            'data-tip': `${value.date}: ${value.count === 2 ? 'Streak Day' : 'Completed'}`,
          };
        }}
        showWeekdayLabels
      />
    </div>
  );
};

export default Calendar;
