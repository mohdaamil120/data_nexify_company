
import React, { useState } from "react";
import "./MeetingCard.css";

const MeetingCard = () => {
  // State to manage dynamic meetings
  const [meetings, setMeetings] = useState([
    { id: 1, time: "10:00 AM", title: "Team Standup", guests: 5 },
    { id: 2, time: "1:00 PM", title: "Client Meeting", guests: 3 },
    { id: 3, time: "3:00 PM", title: "Project Review", guests: 8 },
    { id: 4, time: "10:00 AM", title: "Team Standup", guests: 5 },
    { id: 5, time: "1:00 PM", title: "Client Meeting", guests: 3 },
    { id: 6, time: "3:00 PM", title: "Project Review", guests: 8 },
    { id: 7, time: "10:00 AM", title: "Team Standup", guests: 5 },
    { id: 8, time: "1:00 PM", title: "Client Meeting", guests: 3 },
    { id: 9, time: "3:00 PM", title: "Project Review", guests: 8 },
  ]);

  return (
    <div className="meeting-container">
      <h2 className="calendar-title">Meetings</h2>

      {meetings.length > 0 ? (
        meetings.map((meeting) => (
          <div  className="meeting-card" key={meeting.id}>
            <div className="event-list">
              <div className="event">
                {meeting.title} 
              </div>
              <div className="details">
                <span className="time">{meeting.time}</span>
                <span className="details-guests">{meeting.guests} guests</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No meetings scheduled for today.</p>
      )}
    </div>
  );
};

export default MeetingCard;
