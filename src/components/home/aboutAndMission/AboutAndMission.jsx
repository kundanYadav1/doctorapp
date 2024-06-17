import React from 'react';
import './AboutAndMission.css'; 

const AboutAndMission = () => {
  return (
    <div className="about-us-section">
      
      <div className="content-section">
      <h2>About Us</h2>
        <div className="text-section">
        
          <h3>Lorem ipsum and our history</h3>
          <p>
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
            Lorem ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <hr />
        <div className="text-section">
          <h3>Vision & Mission</h3>
          <p>
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
            Lorem ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries.
          </p>
        </div>
      </div>
      <div className="image-section">
        {/* Your medical professional image goes here */}
        {/* <img src="path-to-medical-professional-image.jpg" alt="Medical Professional" /> */}
      </div>
    </div>
  );
};

export default AboutAndMission;
