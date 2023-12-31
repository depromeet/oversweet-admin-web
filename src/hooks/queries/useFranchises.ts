import api from "@/services/api"
import { useQuery } from "react-query";
import * as queryKeys from "@/constant/queryKeys";
import { IFranchise } from "@/types";

const getFranchises = async () => {
  try {
    const { data } = await api.get<IFranchise[]>('/franchises');
    return data;
  } catch (e) {
    console.error(e);
  }
}

const useFranchises = () => {
  return useQuery([queryKeys.FRANCHISES], getFranchises);
}

export default useFranchises;
