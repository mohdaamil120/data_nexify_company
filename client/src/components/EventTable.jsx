

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EventTable.css"; // Separate CSS file for table

const EventTable = ({ userId, isFetching }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.CALENDAR_BASE_URL}/events/${userId}`);
      setEvents(response.data.userEvents || []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setError("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [userId, isFetching]);

  return (
    // <div className="event-table-container">
    <div className="event-table">
      <h2>Event List</h2>
      {error ? (
        <div className="error-message">{error}</div>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Summary</th>
              <th>Description</th>
              <th>Start</th>
              <th>End</th>
              <th>Attendees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.summary}</td>
                <td>{event.description}</td>
                <td>{new Date(event.start.dateTime).toLocaleString()}</td>
                <td>{new Date(event.end.dateTime).toLocaleString()}</td>
                <td>{event.attendees?.map((a) => a.email).join(", ") || "None"}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventTable;
