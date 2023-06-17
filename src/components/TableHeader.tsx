import { TableCell, TableHead, TableRow } from "@mui/material";

interface Props {
  headers: string[];
}

const TableHeader = ({ headers }: Props) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((label) =>
          <TableCell key={label}>{label}</TableCell>
        )}
      </TableRow>
    </TableHead>
  )
}

export default TableHeader;
