import React from 'react';
import { Box, GridItem } from '@chakra-ui/react';

const KontingentItem = ({ variant, isAvailable }) => {
  const styles = {
    basis: {
      available: {
        w: '100%',
        // h: '100%',
        bg: '#38A169',
        rowSpan: 1,
        colSpan: 2
        // height: '10px',
        // width: '4vw',
        // offsetPosition: 'left 2px',
        // background: '#38A169' // TODO
      },
      used: {
        w: '100%',
        // h: '100%',
        bg: '#C6F6D5',
        rowSpan: 1,
        colSpan: 2
        // height: '10px',
        // width: '4vw',
        // background: '#C6F6D5' // TODO
      }
    },
    plus: {
      available: {
        w: '100%',
        // h: '100%',
        bg: '#805AD5',
        rowSpan: 1,
        colSpan: 1
        // height: '10px',
        // width: '2vw',
        // background: '#805AD5'
      },
      used: {
        w: '100%',
        // h: '100%',
        bg: '#E9D8FD',
        rowSpan: 1,
        colSpan: 1
        // height: '10px',
        // width: '2vw',
        // background: '#E9D8FD' // TODO
      }
    },
    bonus: {
      available: {
        w: '100%',
        // h: '100%',
        bg: '#D53F8C',
        rowSpan: 2,
        colSpan: 1
        // height: '20px',
        // width: '2vw',
        // background: '#D53F8C'
      },
      used: {
        w: '100%',
        // h: '100%',
        bg: '#FED7E2',
        rowSpan: 2,
        colSpan: 1
        // height: '20px',
        // width: '2vw',
        // background: '#FED7E2' // TODO
      }
    }
  };

  // return <Box style={isAvailable ? styles[variant].available : styles[variant].used} />;
  return isAvailable ? (
    <GridItem {...styles[variant].available} />
  ) : (
    <GridItem {...styles[variant].used} />
  );
};

export default KontingentItem;
