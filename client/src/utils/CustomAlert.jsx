import "../components/CustomAlert.css"
import React, { useEffect, useState } from 'react';

const CustomAlert = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); 
  }, []);

  if (!isVisible) return null;

  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-box">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CustomAlert;
