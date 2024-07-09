import React, { useEffect, useState } from 'react';

const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

const Mobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []); 
  
  return (
    <div>
      {isMobile ? (
        <p>You are using a mobile device.</p>
      ) : (
        <p>You are using a desktop device.</p>
      )}
    </div>
  );
};

export default Mobile;
