import { drinkCategoryKeys, drinkCategoryMap } from "@/constant/mappingTable";
import { FormControl, MenuItem, Select } from "@mui/material";

interface Props {
  selectedCategory: string;
  handleChange: (value: string) => void;
}

function CategorySelector({ selectedCategory, handleChange }: Props) {
  return (
    <FormControl>
      <Select
        value={selectedCategory}
        onChange={(e) => handleChange(e.target.value as string)}
      >
        {
          Object.keys(drinkCategoryMap).map((key) => {
            return <MenuItem key={key} value={key}>{drinkCategoryMap[key as drinkCategoryKeys]}</MenuItem>
          })
        }
      </Select>
    </FormControl>
  )
}

export default CategorySelector;
