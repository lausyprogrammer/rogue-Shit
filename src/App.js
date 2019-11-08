import React, { useState } from 'react';
import styled from 'styled-components'
import { Box, Heading, Flex } from 'rebass';
import { Label, Select, Checkbox } from '@rebass/forms';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

import Table from './Components/Table';
import data from './Fixture/ROGUE_GEAR.json'
import {
  CLASS_CONFIG,
  CLASSES,
  ROGUE_STATS_TABLES,
  ROGUE_METHODOLOGY,
  capitalize,
  normalizeGearDataAndBucketBySlot,
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
const LOCAL_STORAGE_CLASS_KEY = 'Thuggin_SUCKS';
const DATA_BY_BUCKETS = normalizeGearDataAndBucketBySlot(data);
const BUCKETS = Object.keys(DATA_BY_BUCKETS);
const PLAYER_CLASSES = Object.keys(CLASSES)

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
          <tr key={a}>
            <td>{a}</td>
            <td>{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function App() {
  const cachedPlayerClass = React.useMemo(() => window.localStorage.getItem(LOCAL_STORAGE_CLASS_KEY), []);

  const [currentSlot, setSlot] = useState(BUCKETS[0]);
  const [isAvailableOnly, setIsAvailableOny] = useState(true);
  const [currentClass, setClass] = useState(cachedPlayerClass || CLASSES.ROGUE);
  const data = React.useMemo(() => {
    let rows = DATA_BY_BUCKETS[currentSlot].sort((a, b) => b.otoSwords - a.otoSwords);

    if (isAvailableOnly) {
      rows = rows.filter(_ => _.isAvailableToday);
    }

    return rows;
  }, [currentSlot, isAvailableOnly]);
  const columns = React.useMemo(() => CLASS_CONFIG[currentClass].columns, [currentClass]);
  const methodology = React.useMemo(() => CLASS_CONFIG[currentClass].methodology, [currentClass]);
  const statTables = React.useMemo(() => CLASS_CONFIG[currentClass].statTables, [currentClass]);

  return (
    <ThemeProvider theme={theme}>
      <Styles>
        <Box m="auto">
          <Flex alignItems="center" justifyContent="space-around">
            {
              methodology ? (
                <Box width={0.25}>
                  <Heading mr={5}>Methodology</Heading>
                  <ul>
                    {
                      methodology.map(({ blurb, src }, index) => (
                        <li key={index}>
                          {blurb} {src ? (<a href={src} target="_blank" rel="noopener noreferrer">[src]</a>) : null}
                        </li>
                      ))
                    }
                  </ul>
                </Box>
              ) : null
            }
            {
              statTables ? (
                <Flex justifyContent="space-around">
                  {statTables.map(table => (
                    <Box key={table.name} p={2}>
                      <h3>{table.name}</h3>
                      <StatsTable data={table.table} />
                    </Box>
                  ))}
                </Flex>
              ) : null
            }
          </Flex>
          <Flex flex alignItems="center" maxWidth={600} m="auto">
            <Box>
              <Label flex alignItems="center">
                <Checkbox checked={!isAvailableOnly} onChange={() => setIsAvailableOny(!isAvailableOnly)} />
                Show Gear From All Phases
            </Label>
            </Box>
            <Box mb={3} mx={2} width={240}>
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
            <Box mb={3} mx={2} width={240}>
              <Label htmlFor='class' mb={1}>Class</Label>
              <Select
                id='class'
                name='class'
                onChange={(e) => {
                  setClass(e.target.value);
                  window.localStorage.setItem(LOCAL_STORAGE_CLASS_KEY, e.target.value);
                }}
                value={currentClass}>
                {PLAYER_CLASSES.map(clazz => (
                  <option key={clazz} value={clazz}>{capitalize(clazz)}</option>
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
