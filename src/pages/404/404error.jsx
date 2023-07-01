import React from 'react';
import video from '../../assets/Erreur404.mp4';

const PageNotFound = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <video style={{ width: 'auto', maxHeight: '75%', pointerEvents: 'none' }} autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default PageNotFound;
