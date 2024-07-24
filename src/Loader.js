import React from 'react';
import { MoonLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="loader-container">
      <MoonLoader color="#6200ea" loading={true} size={150} />
    </div>
  );
};

export default Loader;
