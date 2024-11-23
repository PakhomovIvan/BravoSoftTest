import { useMemo } from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './columns'
import JSON_DATA from '../../data/db.json'
import './MainTable.css'

const MainTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => JSON_DATA.orders, [])

  const tableInstance = useTable({
    columns,
    data,
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, headerGroup_i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup_i}>
            {headerGroup.headers.map((column, column_i) => (
              <th {...column.getHeaderProps()} key={column_i}>
                {column.render('Header')}
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
