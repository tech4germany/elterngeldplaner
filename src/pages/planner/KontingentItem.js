import React from 'react';
import { Box, GridItem } from '@chakra-ui/react';
import constants from '../../utils/constants.json';

const KontingentItem = ({ variant, isAvailable }) => {
  const styles = {
    basis: {
      available: {
        w: '100%',
        // h: '100%',
        bg: constants.varianten.basis.colorActivated,
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
        bg: constants.varianten.basis.colorDeactivated,
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
        bg: constants.varianten.plus.colorActivated,
        rowSpan: 1,
        colSpan: 1
        // height: '10px',
        // width: '2vw',
        // background: '#805AD5'
      },
      used: {
        w: '100%',
        // h: '100%',
        bg: constants.varianten.plus.colorDeactivated,
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
        bg: constants.varianten.bonus.colorActivated,
        rowSpan: 2,
        colSpan: 1
        // height: '20px',
        // width: '2vw',
        // background: '#D53F8C'
      },
      used: {
        w: '100%',
        // h: '100%',
        bg: constants.varianten.bonus.colorDeactivated,
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
