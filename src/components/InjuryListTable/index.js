import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import "./style.css";

function InjuryListTable() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost/hospital-triage-services/api/getInjuryList.php")
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.error("Error fetching patient data:", error));
  }, []);

  const getSeverityLevelProps = (severity) => {
    const levelClass = `severityLevelContainer level-${severity}`;
    const levelText = `Level ${severity}`;
  
    return { text: levelText, className: levelClass };
  };
  

  const columns = React.useMemo(
    () => [
      {
        Header: "Injury Type",
        accessor: "injury_type",
      },
      {
        Header: "Injury Severity",
        accessor: "injury_severity",
        Cell: ({ value }) => {
          // Use getSeverityLevelProps to customize the display of injury severity
          const { text, className } = getSeverityLevelProps(value);
          return <div className={className}>{text}</div>;
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: list });

  return (
    <table {...getTableProps()} className="myTable">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="myTableHeader">
                {column.render("Header")}
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
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="myTableCell">
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default InjuryListTable;
