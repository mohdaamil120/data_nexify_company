
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import EventCreator from "./components/EventCreator";
// import EventTable from "./components/EventTable";
// import Calendar from "./components/Calendar/calendar/Calendar";
// import Sidebar from "./components/Calendar/Sidebar/Sidebar";
// import MeetingCard from "./components/Calendar/MeetingCard/MeetingCard";
// import "./App.css"; // Updated global CSS for the dark theme
// import { FcGoogle } from "react-icons/fc";



// const App = () => {
//   const [user, setUser] = useState(null);
//   const [isFetching, setIsFetching] = useState(false);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");
//     if (code) {
//       axios
//         .get(`https://data-nexify.onrender.com/auth/google-callback?code=${code}`)
//         .then((response) => {
//           setUser(response.data.user);
         
//           window.history.replaceState({}, document.title, "/");
//         })
//         .catch((error) => console.error("Error during token exchange", error));
//     }
//   }, []);

//   const handleSignIn = async () => {
//     const { data } = await axios.get("https://data-nexify.onrender.com/auth/google-url");
//     window.location.href = data.url;
  
//   };

//   return (
//     <div className="main-container">
//       {!user ? (
//         <button className="login-btn" onClick={handleSignIn}>
//           <FcGoogle size={50}/>
//           Sign in with Google
//         </button>
//       ) : (
//         <div className="parent-div">
//             {/* Sidebar */}
//             <div className="sidebar">
//               <Sidebar />
//             </div>

//             {/* Main Content */}
//             <div className="main-content">
//               <EventCreator  userId={user._id} setIsFetching={setIsFetching}/>
//               <MeetingCard />
//               <EventTable  userId={user._id} isFetching = {isFetching}/>
//             </div>

//             {/* Calendar */}
//             <div className="calendar">
//               <Calendar />
//             </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;



























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

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch user data when the URL contains a Google callback code
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      axios
        .get(`https://data-nexify.onrender.com/auth/google-callback?code=${code}`)
        .then((response) => {
          const loggedInUser = response.data.user;
          setUser(loggedInUser);

          // Save user data to localStorage
          localStorage.setItem("user", JSON.stringify(loggedInUser));

          // Clean up the URL
          window.history.replaceState({}, document.title, "/");
        })
        .catch((error) => console.error("Error during token exchange", error));
    }
  }, []);

  const handleSignIn = async () => {
    const { data } = await axios.get("https://data-nexify.onrender.com/auth/google-url");
    window.location.href = data.url;
  };

  const handleLogout = () => {
    // Clear user data from state and localStorage
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="main-container">
      {!user ? (
        <button className="login-btn" onClick={handleSignIn}>
          <FcGoogle size={50} />
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
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
            <EventCreator userId={user._id} setIsFetching={setIsFetching} />
            <MeetingCard />
            <EventTable userId={user._id} isFetching={isFetching} />
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
