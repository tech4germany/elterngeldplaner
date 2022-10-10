import React from 'react';
import { Box } from '@chakra-ui/react';

const KontingentItem = ({ variant, isAvailable }) => {
  const styles = {
    basis: {
      available: {
        height: '10px',
        width: '3.5vw',
        background: '#38A169' // TODO
      },
      used: {
        height: '10px',
        width: '3.5vw',
        background: '#C6F6D5' // TODO
      }
    },
    plus: {
      available: {
        height: '10px',
        width: '1.75vw',
        background: '#805AD5'
      },
      used: {
        height: '10px',
        width: '1.75vw',
        background: '#E9D8FD' // TODO
      }
    },
    bonus: {
      available: {
        height: '20px',
        width: '1.75vw',
        background: '#D53F8C'
      },
      used: {
        height: '20px',
        width: '1.75vw',
        background: '#FED7E2' // TODO
      }
    }
  };

  return <Box style={isAvailable ? styles[variant].available : styles[variant].used} />;
};

export default KontingentItem;
