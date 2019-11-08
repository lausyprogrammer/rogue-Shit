export const CURRENT_PHASE = 1;
export const ROGUE_COLUMNS = [
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
export const ROGUE_STATS_TABLES = [
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
export const ROGUE_METHODOLOGY = [
  {
    blurb: "Oto's measurements are based on the popular rogue guide created for Nostalrius and assume that the users are combat specced and raid buffed. The tables to the right explicitly reflect Alliance buffs.",
    src: 'https://forum.nostalrius.org/viewtopic.php?f=37&t=5412',
  },
  {
    blurb: "AEP stands for Agility Equivalence Points. It's a method to convert the value of item attributes to compare them in terms of Agility points. This is based on the forum discussions with Ming from Lightning's Blade. This is a PVP-Oriented formula which gives more weight to Stamina and defensive stats.",
    src: 'https://shadowpanther.net'
  },
  {
    blurb: 'MAEP stands for Maxmium DPS AEP and is for most intents and purposes the same thing as AEP while ascribing no value to stamina.'
  }
]

export function roundNumber(n) {
  return Math.round(n * 10) / 10;
}

export function getOtoDaggers(item) {
  const { agility, crit, hit, strength, attackPower } = item;

  return roundNumber((crit * 2500) + (hit * 1800) + (agility * 2) + (strength * 1.1) + attackPower);
}

export function getOtoSwords(item) {
  const { agility, crit, hit, strength, attackPower } = item;

  return roundNumber((crit * 2900) + (hit * 2100) + (agility * 2.2) + (strength * 1.1) + attackPower);
}

export function getPercentage(n) {
  return n ? `${n * 100}%` : '';
}

export function getInt(n) {
  return n || '';
}

export function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

export function isItemAvailableToday({ phase, loc }) {
  return phase <= CURRENT_PHASE || (loc.includes('DM') && phase < 3);
}


