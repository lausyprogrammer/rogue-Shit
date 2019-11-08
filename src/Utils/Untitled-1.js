const statTypes = [
  'Tank',
  'Threat - Prot',
  'Threat - Fury',
  'Value',
  'Name',
  'Location',
  'Armor',
  'Stamina',
  'Strength',
  'Agility',
  'AP',
  'Dodge',
  'Parry',
  'Defense',
  'Block %',
  'Block',
  'Crit',
  'Hit',
  'Skill',
  'Skill Type',
  'Damage',
  'Special',
];


const tables = Array.from(
  document.querySelectorAll('.waffle')
);

const slots = Array.from(
  document.querySelectorAll('#sheet-menu li')
).map(li => li.innerText);

const data = slots.reduce((obj, itemSlot, idx) => ({
  ...obj,
  [itemSlot]: tables[idx]
}), {});

let TABLE_START_IDX = 3;
let TABLE_END_IDX = 4;

const extractDataFromRow = (row) => {
  const [
    Tank,
    threatProt,
    ThreatFury,
    Value,
    Name,
    Location,
    Armor,
    Stamina,
    Strength,
    Agility,
    AP,
    Dodge,
    Parry,
    Defense,
    BlockPercent,
    Block,
    Crit,
    Hit,
    Skill,
    SkillType,
    Damage,
    Special
  ] = Array.from(row.querySelectorAll('td'))
    .map(td => {
      console.log(td.innerText)
      return td.innerText;
    })

    return {
      Tank,
      threatProt,
      ThreatFury,
      Value,
      Name,
      Location,
      Armor,
      Stamina,
      Strength,
      Agility,
      AP,
      Dodge,
      Parry,
      Defense,
      BlockPercent,
      Block,
      Crit,
      Hit,
      Skill,
      SkillType,
      Damage,
      Special
    }
}

		// .reduce((acc, stat, idx) => {
    // 	console.log(statTypes[idx], 'stat', stat, 'idx', idx)
    //   return ({
    //   ...acc,
    //   [statTypes[idx]]: /^0-9/.test(stat)
    //     ? parseFloat(stat)
    //     : stat
		// })});

const parseDataOfCategory = (itemSlot, startIdx, endIdx) =>
	Array.from(
		data[itemSlot].querySelectorAll('tr')
	)
	.slice(startIdx, endIdx)
	.map(extractDataFromRow);

parseDataOfCategory('Head', 3,4)[0]
