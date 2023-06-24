import { useQuery } from "react-query";
import * as queryKeys from "@/constant/queryKeys";
import api from "@/services/api"
import { IGetDrinksResponse } from "@/types";

const getDrinks = async (franchiseId: string, currentPage: number) => {
  try {
    const { data } = await api.get<IGetDrinksResponse>(`/franchises/${franchiseId}/drinks?range=${currentPage},10`);
    return data;
  } catch (e) {
    console.error(e);
  }
}

const useDrinks = (franchiseId: string, currentPage: number) => {
  return useQuery([queryKeys.DRINKS, franchiseId, currentPage], () => getDrinks(franchiseId, currentPage));
}

export default useDrinks;
