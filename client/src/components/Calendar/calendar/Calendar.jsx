

// import React from "react";
// import "./Calendar.css";
// // import MeetingCard from "../MeetingCard/MeetingCard";

// const Calendar = () => {
//   return (
//     <div className="calendar">
//       <header className="header">
//         <h2>Today July 22</h2>
//       </header>
     
//       <aside className="month-view">
//         <div className="date-selector">
//           <button className="toggle-btn">Month</button>
//           <button className="toggle-btn">Year</button>
//         </div>
//         <div className="calendar-widget">
//           <h3>July 2021</h3>
//           <div className="days-grid">
//             {/* Calendar grid */}
//           </div>
//         </div>
//         <div className="creater_button">
//             <button className="create-btn">Create Meeting</button>
//             <button className="book-btn">Book Meeting</button>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default Calendar;














import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMonthSelectorVisible, setIsMonthSelectorVisible] = useState(false);
  const [isYearSelectorVisible, setIsYearSelectorVisible] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 10 }, (_, index) => currentDate.getFullYear() - 5 + index);

  const handlePreviousMonth = () => {
    const prevMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
    setCurrentDate(new Date(currentDate.getFullYear(), prevMonth, 1));
  };

  const handleNextMonth = () => {
    const nextMonth = currentDate.getMonth() === 11 ? 0 : currentDate.getMonth() + 1;
    setCurrentDate(new Date(currentDate.getFullYear(), nextMonth, 1));
  };

  const handleMonthSelect = (month) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
    setIsMonthSelectorVisible(false);
  };

  const handleYearSelect = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setIsYearSelectorVisible(false);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInCurrentMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className="calendar">
      <header className="header">
        <h2>
          Today {currentDate.toLocaleDateString("en-US", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </h2>
      </header>

      <aside className="month-view">
        <div className="date-selector">
          <button className="toggle-btn" onClick={() => setIsMonthSelectorVisible(!isMonthSelectorVisible)}>
            Month
          </button>
          <button className="toggle-btn" onClick={() => setIsYearSelectorVisible(!isYearSelectorVisible)}>
            Year
          </button>
        </div>

        {isMonthSelectorVisible && (
          <div className="month-selector">
            {months.map((month, index) => (
              <button key={index} onClick={() => handleMonthSelect(index)}>
                {month}
              </button>
            ))}
          </div>
        )}

        {isYearSelectorVisible && (
          <div className="year-selector">
            {years.map((year) => (
              <button key={year} onClick={() => handleYearSelect(year)}>
                {year}
              </button>
            ))}
          </div>
        )}

        <div className="calendar-widget">
          <h3>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>

          <div className="days-grid">
            <div className="weekdays">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>

            <div className="days">
              {Array(firstDayOfMonth).fill(null).map((_, index) => (
                <div key={`empty-${index}`} className="day empty"></div>
              ))}

              {Array.from({ length: daysInCurrentMonth }, (_, index) => (
                <div key={index} className="day">{index + 1}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="button-container">
          <button className="create-btn">Create Meeting</button>
          <button className="book-btn">Book Meeting</button>
        </div>
      </aside>

      <div className="navigation">
        <FaChevronLeft className="nav-icon" onClick={handlePreviousMonth} />
        <FaChevronRight className="nav-icon" onClick={handleNextMonth} />
      </div>
    </div>
  );
};

export default Calendar;
