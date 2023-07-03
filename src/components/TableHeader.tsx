import { TableCell, TableHead, TableRow } from "@mui/material";

interface Props {
  headers: string[];
  addNewRow?: () => void;
}

const TableHeader = ({ headers, addNewRow }: Props) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((label) =>
          <TableCell key={label}>{label}</TableCell>
        )}
        {
          addNewRow &&
          <TableCell>
            <button onClick={addNewRow}>추가</button>
          </TableCell>}
      </TableRow>
    </TableHead>
  )
}

export default TableHeader;
