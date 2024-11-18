import { useState } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import "./EventCreator.css"
import CustomAlert from '../utils/CustomAlert';



const EventCreator = ({ userId ,setIsFetching }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    summary: '',
    description: '',
    start: '',
    end: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Convert the date-time from form data (assumes user input is in the format YYYY-MM-DDTHH:mm)
    const startDate = new Date(formData.start);
    const endDate = new Date(formData.end);

    const timezone = '+05:30'; // IST offset

    // Manually construct the date-time string with the correct format
    const formattedStart = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}T${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}:${String(startDate.getSeconds()).padStart(2, '0')}${timezone}`;

    const formattedEnd = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}T${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}:${String(endDate.getSeconds()).padStart(2, '0')}${timezone}`;


    // Create the event object with correct date and time format
    const event = {
      summary: formData.summary,
      description: formData.description,
      start: { dateTime: formattedStart }, 
      end: { dateTime: formattedEnd },     
    };

    try {
      handleCancelPopUp()
      setIsFetching(true);
      const response = await axios.post('http://localhost:808/calendar/create-event', {
        userId,
        event
      });

      if (response.data.success) {
        setAlertMessage("Event created successfully!");
        setIsPopupOpen(false);
        setFormData({ summary: '', description: '', start: '', end: '' }); // Reset form
      } else {
        setAlertMessage("Failed to create event.");
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setAlertMessage("Error creating event.");
    }finally {
      
      setIsFetching(false); // Hide loading state
    }
  };

  const handleCancelPopUp = ()=>{
    setIsPopupOpen(false);
    setFormData({ summary: '', description: '', start: '', end: '' }); 
  }

  return (
    <div>
        {alertMessage && <CustomAlert message={alertMessage} onClose={() => setAlertMessage('')} />}
      <button className='event_creator_btn' onClick={() => setIsPopupOpen(true)}>Create Calendar Event</button>

      {isPopupOpen && (
        <div className="popup">
          <form className="popup-form" onSubmit={handleFormSubmit}>
           <div className="heading_cont"> 
              <h3>Create Event</h3>
              <div onClick={handleCancelPopUp}><IoClose color='white' size={33}/></div>
           </div>
            <label>
              Event Summary:
              <input
                type="text"
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Event Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </label>
            <label>
              Start Date-Time:
              <input
                type="datetime-local"
                name="start"
                value={formData.start}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              End Date-Time:
              <input
                type="datetime-local"
                name="end"
                value={formData.end}
                onChange={handleInputChange}
                required
              />
            </label>
          
            <button type="submit">Create Event</button>
            <button type="button" onClick={handleCancelPopUp}>
              Cancel
            </button>
          
          </form>
        </div>
      )}
       
    </div>
  );
};

export default EventCreator;
