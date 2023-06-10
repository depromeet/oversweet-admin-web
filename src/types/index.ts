export interface IFranchise {
  id: number,
  name: string,
  ImageUrl: string,
}

type DrinkCategory = 'AMERICANO' | 'ESPRESSO|' | 'COLDBREW' | 'SHAKE' | 'ADE' | 'LATTE' | 'TEA' | 'SMOOTHIE';

export interface IDrink {
  id: number;
  name: string;
  franchiseName: string;
  size: number;
  sugar: number;
  calorie: number;
  imageUrl: string | null;
  category: DrinkCategory;
}