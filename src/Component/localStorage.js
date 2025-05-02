import axios from "axios";

export const getHabitsFromLocalStorage = () => {
    const data = localStorage.getItem("userHabits");
    return data ? JSON.parse(data) : [];
  };
  
  export const saveHabitsToLocalStorage = (habits) => {
    localStorage.setItem("userHabits", JSON.stringify(habits));
  };
  
  export const clearHabitsFromLocalStorage = () => {
    localStorage.removeItem("userHabits");
  };
  export const loadHabits = async () => {
    try {
      const token = sessionStorage.getItem("token");
  
      const response = await axios.get("http://localhost:8080/api/habits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        const fetchedHabits = response.data.map((habit) => ({
          ...habit,
          edit: false,
        }));
        localStorage.setItem("userHabits", JSON.stringify(fetchedHabits));
        return fetchedHabits;
      } else {
        console.warn("Failed to fetch habits, falling back to localStorage.");
        const localData = localStorage.getItem("userHabits");
        return localData ? JSON.parse(localData) : [];
      }
    } catch (error) {
      console.error("Error fetching habits from API:", error);
      const localData = localStorage.getItem("userHabits");
      return localData ? JSON.parse(localData) : [];
    }
  };
  



//   export const loadHabits = async () => {
//     const localData = localStorage.getItem("userHabits");
//     if (localData) {
//       return JSON.parse(localData);
//     } else {
//       try {
//         const response = await axios.get("http://localhost:8080/api/habits", {
//           withCredentials: true,
//         });
//         if (response.status === 200) {
//           const fetchedHabits = response.data.map(habit => ({
//             ...habit,
//             edit: false,
//           }));
//           localStorage.setItem("userHabits", JSON.stringify(fetchedHabits));
//           return fetchedHabits;
//         } else {
//           return [];
//         }
//       } catch (error) {
//         console.error("Error fetching habits from API:", error);
//         return [];
//       }
//     }
//   };
