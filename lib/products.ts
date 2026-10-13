export type Product = {
  id: string;
  name: string;
  size?: string;
  price: number;
  abbreviation: string;
  tone: "amber" | "green" | "purple" | "pink" | "brown" | "blue";
};

export const PRODUCTS: Product[] = [
  { id: "classic", name: "Classic Milk Tea", size: "Regular", price: 59, abbreviation: "CL", tone: "amber" },
  { id: "wintermelon", name: "Wintermelon Milk Tea", size: "Regular", price: 65, abbreviation: "WM", tone: "green" },
  { id: "taro", name: "Taro Milk Tea", size: "Regular", price: 65, abbreviation: "TR", tone: "purple" },
  { id: "lychee", name: "Fruit Tea - Lychee", size: "Regular", price: 55, abbreviation: "LY", tone: "pink" },
  { id: "brown-sugar", name: "Brown Sugar Milk Tea", size: "Regular", price: 69, abbreviation: "BS", tone: "brown" },
  { id: "water", name: "Bottled Water", price: 20, abbreviation: "H₂O", tone: "blue" },
];

export function formatPeso(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);
}

