import { useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy } from 'react-table'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6'
import { COLUMNS } from './MainTableColumns.js'
import './MainTable.css'
import { getDocsDataApi } from '../../api/getDocsDataApi.js'

const MainTable = () => {
  const [data2, setData2] = useState([])

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => data2, [data2])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getDocsDataApi()
        setData2(fetchedData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: 'count',
            desc: true,
          },
        ],
      },
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
