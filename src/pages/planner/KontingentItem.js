import React from 'react';
import { GridItem } from '@chakra-ui/react';
import constants from '../../utils/constants.json';

const KontingentItem = ({ variant, isAvailable }) => {
  const styles = {
    basis: {
      available: {
        w: '100%',
        bg: constants.varianten.basis.colorActivated,
        rowSpan: 1,
        colSpan: 2
      },
      used: {
        w: '100%',
        bg: constants.varianten.basis.colorDeactivated,
        rowSpan: 1,
        colSpan: 2
      }
    },
    plus: {
      available: {
        w: '100%',
        bg: constants.varianten.plus.colorActivated,
        rowSpan: 1,
        colSpan: 1
      },
      used: {
        w: '100%',
        bg: constants.varianten.plus.colorDeactivated,
        rowSpan: 1,
        colSpan: 1
      }
    },
    bonus: {
      available: {
        w: '100%',
        bg: constants.varianten.bonus.colorActivated,
        rowSpan: 2,
        colSpan: 1
      },
      used: {
        w: '100%',
        bg: constants.varianten.bonus.colorDeactivated,
        rowSpan: 2,
        colSpan: 1
      }
    }
  };

  return isAvailable ? (
    <GridItem {...styles[variant].available} />
  ) : (
    <GridItem {...styles[variant].used} />
  );
};

export default KontingentItem;
