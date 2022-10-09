import React from 'react';

const KontingentItem = ({ variant, isAvailable }) => {
  const styles = {
    basis: {
      available: {
        height: '10px',
        width: '4vw',
        background: 'Green'
      },
      used: {
        height: '10px',
        width: '4vw',
        background: 'white' // TODO
      }
    },
    plus: {
      available: {
        height: '10px',
        width: '2vw',
        background: 'Yellow'
      },
      used: {
        height: '10px',
        width: '2vw',
        background: 'white' // TODO
      }
    },
    bonus: {
      available: {
        height: '20px',
        width: '2vw',
        background: 'Red'
      },
      used: {
        height: '20px',
        width: '2vw',
        background: 'white' // TODO
      }
    }
  };

  return <div style={isAvailable ? styles[variant].available : styles[variant].used} />;
};

export default KontingentItem;
