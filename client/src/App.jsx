
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

  // console.log(`${import.meta.env.VITE_AUTH_BASE_URL}/google-callback?code`)
  // console.log(`${import.meta.env.VITE_AUTH_BASE_URL}/google-url`)
  
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get("code");
  //   console.log("code line 31 ",code)
  //   if (code) {
     
  //     axios
  //       .get(`${import.meta.env.VITE_AUTH_BASE_URL}/google-callback?code=${code}`)
  //       .then((response) => {
  //         const loggedInUser = response.data.user;
  //         setUser(loggedInUser);
  //         console.log("code line 39 ",code)
  //         console.log(`${import.meta.env.VITE_AUTH_BASE_URL}/google-callback?code=${code}`)
  //         // Save user data to localStorage
  //         localStorage.setItem("user", JSON.stringify(loggedInUser));

  //         // Clean up the URL
  //         window.history.replaceState({}, document.title, "/");
  //       })
  //       .catch((error) => console.error("Error during token exchange", error));
  //   }
  // }, []);

 
  // Load user from localStorage on initial render
  

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      // console.log(urlParams)
      // console.log("code from URL:", code); // Logs the `code` from URL when it changes
  
      if (code) {
        axios
          .get(`${import.meta.env.VITE_AUTH_BASE_URL}/google-callback?code=${code}`)
          
          .then((response) => {
            const loggedInUser = response.data.user;
            setUser(loggedInUser);
            // Save user data to localStorage
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            
            // Clean up the URL by removing the `code` query parameter
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

  // console.log("lin 24", import.meta.env.VITE_AUTH_BASE_URL)
  // console.log("lin 25",import.meta.env.VITE_CALENDAR_BASE_URL)

  // Fetch user data when the URL contains a Google callback code


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





  // const handleLogout = () => {
  //   // Clear user data from state and localStorage
  //   setUser(null);
  //   localStorage.removeItem("user");
  // };

  return (
    <div className = {`main-container ${user ? "auto-height" : "full-height"}`}>
      {/* {!user ? (<>        <button className="login-btn" onClick={handleSignIn}>
          <FcGoogle size={50} />
          Sign in with Google
        </button>

        </>

      ) : ( */}
        <div className="parent-div">
          {/* Sidebar */}
          <div className="sidebar">
            <Sidebar  />
          </div>

          {/* Main Content */}
          <div className="main-content">
            {/* <button onClick={handleLogout} className="logout-btn">
              Logout
            </button> */}
            {/* <EventCreator userId={user._id} setIsFetching={setIsFetching} /> */}
            <EventCreator  setIsFetching={setIsFetching} />
            <MeetingCard />
            {/* <EventTable userId={user._id} isFetching={isFetching} /> */}
            <EventTable  isFetching={isFetching} />
          </div>

          {/* Calendar */}
          <div className="calendar">
            <Calendar  />
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default App;
