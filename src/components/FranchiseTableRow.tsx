import { IFranchise } from "@/types";
import { TableCell, TableRow } from "@mui/material"

const FranchiseTableRow = ({ id, name, ImageUrl }: IFranchise) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{ImageUrl}</TableCell>
    </TableRow>
  )
}

export default FranchiseTableRow;
