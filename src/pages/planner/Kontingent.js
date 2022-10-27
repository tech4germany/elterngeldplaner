import { useEffect, useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import constants from '../../utils/constants.json';
import KontingentItem from './KontingentItem';

import icons from '../../utils/icons';

const Kontingent = ({ egPlan }) => {
  const [kontingentItems, setKontingentItems] = useState({ basis: [], plus: [], bonus: [] });
  const [kontingentDisplay, setKontingentDisplay] = useState({ basis: [], plus: [], bonus: [] });
  const maxKontingent = {
    basis: constants.varianten.basis.maxMonths - 0.5, // because 0.5 months left cannot be used for another basis month
    plus: constants.varianten.plus.maxMonths,
    bonus: constants.varianten.bonus.maxMonths / 2 - 0.5 // because PB can only be taken two months at a time
  };

  useEffect(() => {
    const availableKontingent = {
      basis: maxKontingent.basis,
      plus: maxKontingent.plus,
      bonus: maxKontingent.bonus
    };
    // check how many months are available for each variant
    for (let i = 0; i < egPlan.length; i += 1) {
      for (let j = 0; j < egPlan[i].months.length; j += 1) {
        switch (egPlan[i].months[j].variant) {
          case 'basis':
            availableKontingent.basis -= 1;
            availableKontingent.plus -= 2;
            break;
          case 'plus':
            availableKontingent.plus -= 1;
            availableKontingent.basis -= 0.5;

            break;
          case 'bonus':
            availableKontingent.bonus -= 0.5;
            break;
          default:
            break;
        }
      }
    }

    // set up kontingent items
    const newKontingentItems = { basis: [], plus: [], bonus: [] };
    Object.keys(kontingentItems).forEach((key) => {
      for (let i = 0; i < availableKontingent[key]; i += 1) {
        newKontingentItems[key].push(<KontingentItem variant={key} isAvailable key={key + i} />);
      }
      for (let i = availableKontingent[key]; i < maxKontingent[key]; i += 1) {
        newKontingentItems[key].push(
          <KontingentItem variant={key} isAvailable={false} key={key + i} />
        );
      }
    });
    setKontingentItems(newKontingentItems);

    // set up kontingent display
    const newKontingentDisplay = { basis: [], plus: [], bonus: [] };
    Object.keys(newKontingentDisplay).forEach((key) => {
      newKontingentDisplay[key].push(
        // TODO: Col nicht verwenden, da bootstrap nicht chakra
        <div key={key} className="d-flex align-items-center justify-content-center p-0">
          <img
            src={icons[key]}
            alt="Icon EG-Variante"
            width="14px"
            height="auto"
            style={{ marginRight: '3px' }}
          />
          <span
            style={{
              marginRight: '4px',
              color: constants.varianten[key].colorActivated,
              fontWeight: 'bold'
            }}>
            {constants.varianten[key].abbrvOverlay}
          </span>
          {key === 'bonus'
            ? Math.ceil(availableKontingent[key]) * 2
            : Math.ceil(availableKontingent[key])}
          /{key === 'bonus' ? Math.ceil(maxKontingent[key]) * 2 : Math.ceil(maxKontingent[key])}
        </div>
      );
    });
    setKontingentDisplay(newKontingentDisplay);
  }, [egPlan]);
  return (
    <Grid
      className="d-flex-row align-items-center justify-content-center"
      templateColumns="repeat(32, 1fr)"
      templateRows="repeat(3, 1fr)"
      gap={0.5}
      p={0}
      h="45px">
      <GridItem rowSpan={1} colSpan={32} h="100%">
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem colSpan={1}>{kontingentDisplay.basis}</GridItem>
          <GridItem colSpan={1}>{kontingentDisplay.plus}</GridItem>
          <GridItem colSpan={1}>{kontingentDisplay.bonus}</GridItem>
        </Grid>
      </GridItem>
      <GridItem rowSpan={1} colSpan={28} h="100%">
        <Grid templateColumns="repeat(28, 1fr)" templateRows="repeat(1, 1fr)" h="100%" gap={0.5}>
          {kontingentItems.basis}
        </Grid>
      </GridItem>
      <GridItem rowSpan={2} colSpan={4} h="100%">
        <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(2, 1fr)" h="100%" gap={0.5}>
          {kontingentItems.bonus}
        </Grid>
      </GridItem>
      <GridItem rowSpan={1} colSpan={28} h="100%">
        <Grid templateColumns="repeat(28, 1fr)" templateRows="repeat(1, 1fr)" h="100%" gap={0.5}>
          {kontingentItems.plus}
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default Kontingent;
