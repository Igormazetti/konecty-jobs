import ProductsList from "./components/ProductsList";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products");
  return await res.json();
}

export default async function Page() {
  const products = await getProducts();

  return <ProductsList products={products || []} />;
}
