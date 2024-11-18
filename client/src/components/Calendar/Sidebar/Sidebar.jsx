
// import React, { useState } from "react";
// import "./Sidebar.css";

// const Sidebar = () => {
//   // State to manage the active menu item
//   const [activeItem, setActiveItem] = useState("Calendar");

//   // Handle menu item click
//   const handleMenuClick = (item) => {
//     setActiveItem(item);
//   };

//   return (
//     <div className="sidebar">
//       <div className="profile">
//         <div className="avatar">AB</div>
//         <div className="name">Alexander Brown</div>
//         <div className="designation">Product Manager</div>
//       </div>
//       <ul className="menu">
//         {["Calendar", "Contacts", "Dashboard", "Messages", "Settings"].map(
//           (item) => (
//             <li
//               key={item}
//               className={activeItem === item ? "active" : ""}
//               onClick={() => handleMenuClick(item)}
//             >
//               {item}
//             </li>
//           )
//         )}
//       </ul>
//       <div className="footer">
//         <button className="help">Help</button>
//         <button className="logout">Log Out</button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;















import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  // State to manage the active menu item
  const [activeItem, setActiveItem] = useState("Calendar");

  // Handle menu item click
  const handleMenuClick = (item) => {
    setActiveItem(item);
  };

  // Logout function to clear localStorage and refresh the page
  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    window.location.reload(); // Refresh the page to reflect the logout
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <div className="avatar">AB</div>
        <div className="name">Alexander Brown</div>
        <div className="designation">Product Manager</div>
      </div>
      <ul className="menu">
        {["Calendar", "Contacts", "Dashboard", "Messages", "Settings"].map(
          (item) => (
            <li
              key={item}
              className={activeItem === item ? "active" : ""}
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </li>
          )
        )}
      </ul>
      <div className="footer">
        <button className="help">Help</button>
        <button className="logout" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
