import DrinkTable from "@/components/DrinkTable";
import useDrinks from "@/hooks/queries/useDrinks";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const DrinkList = () => {
  const router = useRouter();
  const franchiseId = router.query.id as string;
  const [currentPage, setCurrentPage] = useState(1);
  const drinksQuery = useDrinks(franchiseId, currentPage - 1);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  }

  if (drinksQuery.data) {
    return (
      <div>
        <DrinkTable data={drinksQuery.data.data} />
        <Pagination count={drinksQuery.data.totalPage} page={currentPage} onChange={handlePageChange} />
      </div>
    )
  }

  if (drinksQuery.error || router.query.id === undefined) return <div>Error</div>

  return <div>Loading...</div>

}

export default DrinkList;