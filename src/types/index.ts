import { drinkCategoryKeys } from "@/constant/mappingTable";

export interface IFranchise {
  id: number,
  name: string,
  imageUrl: string,
}

export interface IDrink {
  id: number;
  name: string;
  franchiseName: string;
  size: number;
  sugar: number;
  calorie: number;
  imageUrl: string | null;
  category: drinkCategoryKeys;
  isMinimum: boolean;
}

export type TCreateDrinkDto = Omit<IDrink, 'id' | 'franchiseName'>;

export interface IGetDrinksResponse {
  data: IDrink[];
  hasNext: boolean;
  totalDataCount: number;
  totalPage: number;
}
