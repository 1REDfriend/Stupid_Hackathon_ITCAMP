import React from 'react';
import Particles from 'react-particles-js';

const ParticleEffect = () => {
  const particleParams = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: '#000000',
      },
      size: {
        value: 3,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#000000',
        opacity: 0.4,
        width: 1,
      },
    },
  };

  return (
    <Particles
      params={particleParams}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default ParticleEffect;
