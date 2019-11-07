import React, { useState } from 'react';
import styled from 'styled-components'
import { Box, Heading } from 'rebass';
import { Label, Select } from '@rebass/forms';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

import Table from './Components/Table';
import data from './Fixture/ROGUE_GEAR.json'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    margin: auto;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function roundNumber(n) {
  return Math.round(n * 10) / 10;
}

function getOtoDaggers(item) {
  const { agility, crit, hit, strength, attackPower } = item;

  return roundNumber((crit * 2500) + (hit * 1800) + (agility * 2) + (strength * 1.1) + attackPower);
}

function getOtoSwords(item) {
  const { agility, crit, hit, strength, attackPower } = item;

  return roundNumber((crit * 2900) + (hit * 2100) + (agility * 2.2) + (strength * 1.1) + attackPower);
}

function getPercentage(n) {
  return n ? `${n * 100}%` : '';
}

function getInt(n) {
  return n || '';
}

const DATA_BY_BUCKETS = data.map(item => {
  const { crit, hit, parry, dodge, armor, agility, stamina, strength, attackPower } = item;
  return {...item,
    otoDaggers: getOtoDaggers(item),
    otoSwords: getOtoSwords(item),
    crit: getPercentage(crit),
    hit: getPercentage(hit),
    parry: getPercentage(parry),
    dodge: getPercentage(dodge),
    armor: getInt(armor),
    agility: getInt(agility),
    stamina: getInt(stamina),
    strength: getInt(strength),
    attackPower: getInt(attackPower),
  }
}).reduce((map, item) => {
  const { slot } = item;
  if (map[slot]) {
    map[slot].push(item);
  } else {
    map[slot] = [item];
  }

  return map;
}, {});
const BUCKETS = Object.keys(DATA_BY_BUCKETS);
const COLUMNS = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Oto Swords', accessor: 'otoSwords' },
  { Header: 'Oto Daggers', accessor: 'otoDaggers' },
  { Header: 'AEP', accessor: 'aep' },
  { Header: 'MAEP', accessor: 'maep' },
  { Header: 'Location', accessor: 'loc' },
  { Header: 'Phase', accessor: 'phase' },
  { Header: 'Info', accessor: 'info' },
  { Header: 'Source', accessor: 'source' },
  { Header: 'Set', accessor: 'set' },
  { Header: 'Level', accessor: 'lvl' },
  { Header: 'Binds on', accessor: 'bindOn' },
  { Header: 'Armor', accessor: 'armor' },
  { Header: 'Agility', accessor: 'agility' },
  { Header: 'Stamina', accessor: 'stamina' },
  { Header: 'Strength', accessor: 'strength' },
  { Header: 'Attack Power', accessor: 'attackPower' },
  { Header: 'Crit Chance', accessor: 'crit' },
  { Header: 'Hit Chance', accessor: 'hit' },
  { Header: 'Parry Chance', accessor: 'parry' },
  { Header: 'Dodge Chance', accessor: 'dodge' },
  { Header: 'Defense', accessor: 'defense' },
  { Header: 'Special', accessor: 'special' },
  { Header: 'Link', accessor: 'link', show: false }
]

function App() {
  const [currentSlot, setSlot] = useState(BUCKETS[0]);
  const data = DATA_BY_BUCKETS[currentSlot];

  return (
    <ThemeProvider theme={theme}>
    <Styles>
      <Heading textAlign="center">Delrond did a thing...</Heading>
      <Box m="auto">
      <Box mb={3} mx="auto" width={360}>
        <Label htmlFor='slot'>Slot</Label>
        <Select
          id='slot'
          name='slot'
          onChange={(e) => setSlot(e.target.value)}
          value={currentSlot}>
            {BUCKETS.map(slot => (
              <option key={slot}>{slot}</option>
            ))}
          </Select>
      </Box>
      <Table columns={COLUMNS} data={data} />
      </Box>
    </Styles>
    </ThemeProvider>
  );
}

export default App;
