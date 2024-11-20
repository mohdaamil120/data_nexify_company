
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCreator from "./components/EventCreator";
import EventTable from "./components/EventTable";
import Calendar from "./components/Calendar/calendar/Calendar";
import Sidebar from "./components/Calendar/Sidebar/Sidebar";
import MeetingCard from "./components/Calendar/MeetingCard/MeetingCard";
import "./App.css"; // Updated global CSS for the dark theme
import { FcGoogle } from "react-icons/fc";



const App = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

 

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
  
      if (code) {
        axios
          .get(`${import.meta.env.VITE_AUTH_BASE_URL}/google-callback?code=${code}`)
          
          .then((response) => {
            const loggedInUser = response.data.user;
            setUser(loggedInUser);
          
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            
           
            window.history.replaceState({}, document.title, "/");
          })
          .catch((error) => console.error("Error during token exchange", error));
      }
    }, [window.location.href]); 
    

  
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const handleSignIn = async () => {
    // const { data } = await axios.get(`${import.meta.env.VITE_AUTH_BASE_URL}/google-url`);
   try {
    const { data } = await axios.get(`${import.meta.env.VITE_AUTH_BASE_URL}/google-url`);
    // console.log("data from line no. 81 " , data.url)
    window.location.href = data.url;
   } catch (err) {
    console.log("catch error line 92" , err)
   }
  };




  return (
    <div className = {`main-container ${user ? "auto-height" : "full-height"}`}>
      {!user ? (<>        <button className="login-btn" onClick={handleSignIn}>
          <FcGoogle size={50} />
          Sign in with Google
        </button>

        </>

      ) : (
        <div className="parent-div">
          {/* Sidebar */}
          <div className="sidebar">
            <Sidebar  />
          </div>

          {/* Main Content */}
          <div className="main-content">
            <EventCreator userId={user._id} setIsFetching={setIsFetching} />
            <MeetingCard />
            <EventTable userId={user._id} isFetching={isFetching} />
          </div>

          {/* Calendar */}
          <div className="calendar">
            <Calendar  />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
