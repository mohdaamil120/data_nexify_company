
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
    console.log("urlParams ",urlParams)
    const code = urlParams.get("code");
    console.log("code ",code)
    if (code) {
      axios
        .get(`https://data-nexify.onrender.com/auth/google-callback?code=${code}`)
        .then((response) => {
          setUser(response.data.user);
          console.log("response.data.user ",response.data.user)
          window.history.replaceState({}, document.title, "/");
        })
        .catch((error) => console.error("Error during token exchange", error));
    }
  }, []);

  const handleSignIn = async () => {
    const { data } = await axios.get("https://data-nexify.onrender.com/auth/google-url");
    window.location.href = data.url;
    console.log("data 35 iline no " ,data)
    console.log("data 35 iline no " ,data.url)
  };

  return (
    <div className="main-container">
      {!user ? (
        <button className="login-btn" onClick={handleSignIn}>
          <FcGoogle size={50}/>
          Sign in with Google
        </button>
      ) : (
        <div className="parent-div">
            {/* Sidebar */}
            <div className="sidebar">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="main-content">
              <EventCreator  userId={user._id} setIsFetching={setIsFetching}/>
              <MeetingCard />
              <EventTable  userId={user._id} isFetching = {isFetching}/>
            </div>

            {/* Calendar */}
            <div className="calendar">
              <Calendar />
            </div>
        </div>
      )}
    </div>
  );
};

export default App;


