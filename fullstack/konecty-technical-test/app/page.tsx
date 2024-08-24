import ProductsList from "./components/ProductsList";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products");
  return await res.json();
}

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="bg-[#F4F4F4] min-h-[100vh] pl-6 pr-1 md:flex md:justify-center pt-10 pb-4">
      <ProductsList products={products || []} />
    </div>
  );
}
