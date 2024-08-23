import { products } from "../../database/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let result = products;

  if (category && category !== "Todos") {
    result = result.filter((item) => item.category === category);
  }

  return NextResponse.json(result);
}
