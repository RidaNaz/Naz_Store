import { NextResponse } from "next/server";
import ProductsData from "@/components/ProductData";

export const GET = async () => {
  try {
    return NextResponse.json({
      message: "Products fetched successfully",
      success: true,
      ProductsData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Product loading error",
      },
      { status: 500 }
    );
  }
};