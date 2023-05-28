import React, {useMemo, useState} from "react";
import { useTable, useSortBy } from "react-table/dist/react-table.development";
import { GROUPED_COLUMNS } from "./columns";
import "./table.css";
import axios from "axios";

const SortingTable = (saves) => {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = saves.saves;
  const [liked, setLiked] = useState([]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = tableInstance;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                if (cell.column.id === "likes") {
                  return <button disabled={liked.includes(cell.row.cells[0].value)}
                                 onClick={async () => {
                                   console.log('id', cell.row.cells[0].value);
                                   setLiked([...liked, cell.row.cells[0].value]);
                                   console.log(cell.value);
                                   await axios.post(
                                     `http://localhost:4000/like`,
                                     {
                                       id: cell.row.cells[0].value,
                                     }
                                   );
                                 }}>{cell.value} likes</button>;
                }
                return (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                );
              })}
            </tr>
          );
        })}
        </tbody>
      </table>{" "}
    </>
  );
};

export default SortingTable;
