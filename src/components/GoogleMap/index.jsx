/** @format */

import React from 'react';

const GoogleMap = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '400px',
        marginBottom: '20px',
        marginTop: '20px',
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.33843898492!2d76.7928016755629!3d30.73699358542677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed39cefbf0f9%3A0x8e9e5c08f9acb3af!2sNRICH%20Learning%20the%20One%20Stop%20Solution%20for%20all%20Education%20%26%20Teaching%20needs!5e0!3m2!1sen!2sin!4v1699078148092!5m2!1sen!2sin"
        width="600"
        height="450"
        style={{ border: 0, height: '100%', width: '88%', margin: 'auto' }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
