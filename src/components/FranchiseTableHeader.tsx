import { TableCell, TableHead, TableRow } from "@mui/material";

const headerLabel = ['id', '이름', '이미지'];

const FranchiseTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {headerLabel.map((label) =>
          <TableCell key={label}>{label}</TableCell>
        )}
      </TableRow>
    </TableHead>
  )
}

export default FranchiseTableHeader;