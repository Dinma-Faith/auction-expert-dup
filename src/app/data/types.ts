export interface Lot {
  id: string;
  lotNumber: string;
  title: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  currentBid: number;
  buyNowPrice: number;
  images: string[];
  mileage?: number;
  condition?: string;
  primaryDamage?: string;
  secondaryDamage?: string;
  location?: string;
  drive?: string;
  transmission?: string;
  cylinders?: string;
  color?: string;
  saleState?: string;
  hasKeys?: boolean;
  [key: string]: any;
}
