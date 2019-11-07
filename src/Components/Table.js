import { useTable, useSortBy } from 'react-table'
import React from 'react';
import styled from 'styled-components';

const PHASE_BACKGROUND_COLORS = {
  2: '#eee',
  3: '#ddd',
  4: '#ccc',
  5: '#bbb',
  6: '#aaa'
}

const CURRENT_PHASE = 1;
const PhaseRow = styled.tr`
  background-color: ${props => props.isAvailableToday ? '#fff' : PHASE_BACKGROUND_COLORS[props.phase]};
`;
const Loot = styled.a`
  color: ${props => props.quality};
  font-weight: bold;
`;

export default function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )


  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              const isAvailableToday = (row.values.phase <= CURRENT_PHASE) || row.values.loc.includes('DM');

              return (
                <PhaseRow {...row.getRowProps()} isAvailableToday={isAvailableToday} phase={row.values.phase}>
                  {row.cells.map(cell => {
                    const cellProps = cell.getCellProps();
                    const isNameCell = cell.column.Header === 'Name';

                    return isNameCell ? (
                      <td {...cellProps}>
                        <Loot href={cell.row.values.link} quality={row.values.quality}>{cell.render('Cell')}</Loot>
                      </td>
                    ) : (
                      <td {...cellProps}>{cell.render('Cell')}</td>
                      )
                  })}
                </PhaseRow>
              )
            }
          )}
        </tbody>
      </table>
    </>
  )
}
