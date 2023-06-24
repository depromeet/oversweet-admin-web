import { IDrink } from "@/types";
import { TableRow, TableCell } from "@mui/material";

interface Props {
  data: IDrink;
}

const DrinkTableRow = ({ data }: Props) => {
  return (
    <TableRow>
      <TableCell>{data.id}</TableCell>
      <TableCell>{data.name}</TableCell>
      <TableCell>{data.size}</TableCell>
      <TableCell>{data.sugar}</TableCell>
      <TableCell>{data.calorie}</TableCell>
      <TableCell>{data.imageUrl}</TableCell>
      <TableCell>{data.category}</TableCell>
    </TableRow>
  )
}

export default DrinkTableRow;
