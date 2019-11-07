import React, { useState } from 'react';
import styled from 'styled-components'
import { Box, Heading, Flex } from 'rebass';
import { Label, Select, Checkbox } from '@rebass/forms';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

import Table from './Components/Table';
import data from './Fixture/ROGUE_GEAR.json'

const CURRENT_PHASE = 1;

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

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

const DATA_BY_BUCKETS = data.map(item => {
  const { crit, hit, parry, dodge, armor, agility, stamina, strength, attackPower, loc, phase } = item;
  const isAvailableToday = phase <= CURRENT_PHASE || (loc.includes('DM') && phase < 3);
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
    isAvailableToday,
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
  { Header: 'Oto Swords Buffed', accessor: 'otoSwords' },
  { Header: 'Oto Daggers Buffed', accessor: 'otoDaggers' },
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
  { Header: 'Link', accessor: 'link', show: false },
  { Header: 'Quality', accessor: 'quality', show: false },
  { Header: 'Is Available', accessor: 'isAvailableToday', show: false }
];

const STATS_TABLES = [
  {
    name: 'Oto Sword',
    table: [['1 Crit', '29 AP'],
    ['1 Hit', '21 AP'],
    ['1 Agi', '2.2 AP'],
    ['1 Str', '1.1 AP'],
    ['1 Sta', '0 AP'],
    ['1 AP', '1 AP']],
    desc: 'From Oto\'s Rogue Guide created back in March of 2015 for Nostalrius. These numbers assume a combat swords spec',
    src: 'https://forum.nostalrius.org/viewtopic.php?f=37&t=5412',
  },
  {
    name: 'Oto Dagger',
    table: [['1 Crit', '25 AP'],
    ['1 Hit', '18 AP'],
    ['1 Agi', '2 AP'],
    ['1 Str', '1.1 AP'],
    ['1 Sta', '0 AP'],
    ['1 AP', '1 AP']],
    desc: 'From Oto\'s Rogue Guide created back in March of 2015 for Nostalrius. These numbers assume a combat daggers spec',
    src: 'https://forum.nostalrius.org/viewtopic.php?f=37&t=5412',
  },
  {
    name: 'AEP',
    table: [['1 Crit', '10 Agi'],
    ['1 Hit', '7.5 Agi'],
    ['1 Agi', '1 Agi'],
    ['1 Str', '0.5 Agi'],
    ['1 Sta', '1 Agi'],
    ['1 AP', '0.5 Agi']],
    src: 'https://shadowpanther.net/',
    desc: 'Agility Equivalence Points. A method to convert the value of item attributes to compare them in terms of Agility points. Based on the forum discussion by Ming from Lightning\'s Blade. This is a PVP-Oriented formula which gives more weight to Stamina and defensive stats.'
  },
  {
    name: 'MAEP',
    table: [['1 Crit', '10 Agi'],
    ['1 Hit', '7.5 Agi'],
    ['1 Agi', '1 Agi'],
    ['1 Str', '0.5 Agi'],
    ['1 Sta', '0 Agi'],
    ['1 AP', '0.5 Agi']],
    src: 'https://shadowpanther.net/',
    desc: 'Maximum DPS AEP for use in maximizing PVE raid DPS.'
  },
]


function StatsTable(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map(([a, b]) =>  (
          <tr>
            <td>{a}</td>
            <td>{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function App() {
  const [currentSlot, setSlot] = useState(BUCKETS[0]);
  const [isAvailableOnly, setIsAvailableOny] = useState(true);
  const data = React.useMemo(() => {
    let rows = DATA_BY_BUCKETS[currentSlot].sort((a, b) => b.otoSwords - a.otoSwords);

    if (isAvailableOnly) {
      rows = rows.filter(_ => _.isAvailableToday);
    }

    return rows;
  }, [currentSlot, isAvailableOnly]);

  return (
    <ThemeProvider theme={theme}>
    <Styles>
      <Box m="auto">
        <Flex alignItems="center" justifyContent="space-around">
          <Box width={0.25}>
            <Heading mr={5}>Methodology</Heading>
            <ul>
              <li>
                  Oto's measurements are based on the popular rogue guide created for Nostalrius and assume that the users are combat specced and raid buffed. The tables to the right explicitly reflect Alliance buffs. <a href="https://forum.nostalrius.org/viewtopic.php?f=37&t=5412" target="_blank" rel="noopener noreferrer">[src]</a>
              </li>
              <li>
                  AEP stands for Agility Equivalence Points. It's a method to convert the value of item attributes to compare them in terms of Agility points. This is based on the forum discussions with Ming from Lightning's Blade. This is a PVP-Oriented formula which gives more weight to Stamina and defensive stats. <a href="https://shadowpanther.net" target="_blank" rel="noopener noreferrer">[src]</a>
              </li>
              <li>
                MAEP stands for Maxmium DPS AEP and is for most intents and purposes the same thing as AEP while ascribing no value to stamina.
              </li>
            </ul>
          </Box>
          <Flex justifyContent="space-around">
            {STATS_TABLES.map(table => (
              <Box key={table.name} p={2}>
                <h3>{table.name}</h3>
                <StatsTable data={table.table} />
              </Box>
            ))}
          </Flex>
        </Flex>
        <Flex flex alignItems="center" maxWidth={600} m="auto">
          <Box>
            <Label flex alignItems="center">
              <Checkbox checked={!isAvailableOnly} onChange={() => setIsAvailableOny(!isAvailableOnly)} />
              Show Gear From All Phases
            </Label>
          </Box>
          <Box mb={3} mx="auto" width={360}>
            <Label htmlFor='slot' mb={1}>Slot</Label>
            <Select
              id='slot'
              name='slot'
              onChange={(e) => setSlot(e.target.value)}
              value={currentSlot}>
              {BUCKETS.map(slot => (
                <option key={slot} value={slot}>{capitalize(slot)}</option>
              ))}
            </Select>
          </Box>
        </Flex>
        <Table columns={COLUMNS} data={data} />
      </Box>
    </Styles>
    </ThemeProvider>
  );
}

export default App;
