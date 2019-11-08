import React, { useState } from 'react';
import styled from 'styled-components'
import { Box, Heading, Flex } from 'rebass';
import { Label, Select, Checkbox } from '@rebass/forms';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

import Table from './Components/Table';
import data from './Fixture/ROGUE_GEAR.json'
import {
  ROGUE_COLUMNS,
  ROGUE_STATS_TABLES,
  ROGUE_METHODOLOGY,
  getOtoDaggers,
  getOtoSwords,
  getPercentage,
  getInt,
  capitalize,
  isItemAvailableToday,
} from './Utils/helpers';

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

const DATA_BY_BUCKETS = data.map(item => {
  const { crit, hit, parry, dodge, armor, agility, stamina, strength, attackPower } = item;
  return {
    ...item,
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
    isAvailableToday: isItemAvailableToday(item),
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
        {props.data.map(([a, b]) => (
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
  const columns = React.useMemo(() => ROGUE_COLUMNS, []);

  return (
    <ThemeProvider theme={theme}>
      <Styles>
        <Box m="auto">
          <Flex alignItems="center" justifyContent="space-around">
            <Box width={0.25}>
              <Heading mr={5}>Methodology</Heading>
              <ul>
                {
                  ROGUE_METHODOLOGY.map(({ blurb, src }) => (
                    <li>
                      {blurb} {src ? (<a href={src} target="_blank" rel="noopener noreferrer">[src]</a>) : null}
                    </li>
                  ))
                }
              </ul>
            </Box>
            <Flex justifyContent="space-around">
              {ROGUE_STATS_TABLES.map(table => (
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
          <Table columns={columns} data={data} />
        </Box>
      </Styles>
    </ThemeProvider>
  );
}

export default App;
