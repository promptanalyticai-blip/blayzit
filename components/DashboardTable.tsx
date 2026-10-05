//components/DashboardTable.tsx
interface DashboardTableProps {
  columns: string[];
  rows: Array<Array<string | number>>;
}

export default function DashboardTable({ columns, rows }: DashboardTableProps) {
  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rIndex) => (
          <tr key={rIndex}>
            {row.map((cell, cIndex) => (
              <td key={cIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
