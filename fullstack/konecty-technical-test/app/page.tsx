import ProductsList from "./components/ProductsList";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products");
  return await res.json();
}

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="bg-[#F4F4F4] h-screen p-6 md:px-[150px] md:pt-10">
      <ProductsList products={products || []} />
    </div>
  );
}
