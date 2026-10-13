export type Product = {
  id: string;
  name: string;
  size?: string;
  price: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  { id: "classic", name: "Classic Milk Tea", size: "Regular", price: 59, image: "/images/products/milktea.jpg" },
  { id: "wintermelon", name: "Wintermelon Milk Tea", size: "Regular", price: 65, image: "/images/products/wintermelon_milktea.jpg" },
  { id: "taro", name: "Taro Milk Tea", size: "Regular", price: 65, image: "/images/products/taro_milktea.jpg" },
  { id: "lychee", name: "Fruit Tea - Lychee", size: "Regular", price: 55, image: "/images/products/fruittea_lychee.jpg" },
  { id: "brown-sugar", name: "Brown Sugar Milk Tea", size: "Regular", price: 69, image: "/images/products/milktea_brownsugar.jpg" },
  { id: "water", name: "Bottled Water", price: 20, image: "/images/products/bottled_water.jpg" },
];

export function formatPeso(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);
}

