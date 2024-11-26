import { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6'
import { COLUMNS } from './MainTableColumns.js'
import JSON_DATA from '../../data/db.json'
import './MainTable.css'

const MainTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => JSON_DATA.docs, [])

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, headerGroup_i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup_i}>
            {headerGroup.headers.map((column, column_i) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={column_i}
              >
                {column.render('Header')}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FaSortDown />
                    ) : (
                      <FaSortUp />
                    )
                  ) : (
                    <FaSort />
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, row_i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} key={row_i}>
              {row.cells.map((cell, cell_i) => {
                return (
                  <td {...cell.getCellProps()} key={cell_i}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default MainTable
