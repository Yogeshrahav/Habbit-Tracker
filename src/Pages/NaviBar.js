import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import './navBar.css';
import { useNavigate } from 'react-router-dom';

const NaviBar = () => {
    const navigate = useNavigate();

    const handleNavigate = () =>{
        navigate('/Tracker')
    }
    const handleHome = () => {
        navigate('/Home')
    }
    const handleCalender =() =>{
        navigate('/Calender')
    }
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        localStorage.removeItem('userHabits')
        navigate('/Login')
    }
    
  return (
    <div>
        <button onClick={handleCalender}><CalendarMonthIcon/></button>
        <button onClick={handleHome}><HomeIcon/></button>
        <button onClick={handleNavigate}>
            <SpaceDashboardIcon style={{marginRight:"8px"}}/>
            </button>
            <button onClick={handleLogout}> <LogoutIcon style = {{marginRight:"8px"}} /> </button>
    </div>
  )
}

export default NaviBar