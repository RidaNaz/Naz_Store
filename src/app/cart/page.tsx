"use client";

import Container from "@/components/Container";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../type";
import CartItem from "@/components/CartItem";
import { resetCart, setCartData } from "@/redux/shoppingSlice";
import PaymentForm from "@/components/PaymentForm";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import toast from "react-hot-toast";
import { Product as IProduct } from "@/type"
// import { useEffect, useState } from "react";
// import { getSingleProduct } from "@/helpers";

const CartPage = () => {
  const dispatch = useDispatch();
  const { userInfo }: any = useSelector(
    (state: StateProps) => state.shopping
  );

  const cartData = useSelector((state: StateProps) => state.shopping.productData);

  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     try {
  //       const response = await fetch(`/api/postgres?user_id=${userInfo ? userInfo.unique_id : "Anonymous"}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch cart data");
  //       }
  //       const data = await response.json();
  //       const cartProduct = await data.allCartData.map(async (item: any) => await getSingleProduct(Number(item.product_id)));

  //       const cartProducts = await Promise.all(cartProduct);
        
  //       const combinedData = data.allCartData.map((cartItem: any, index: number) => ({
  //         ...cartProducts[index],
  //         quantity: cartItem.quantity
  //       }));
  //       dispatch(setCartData(combinedData));
  //     } catch (error) {
  //       console.error("Error fetching cart data:", error);
  //     }
  //   };

  //   if (userInfo) {
  //     fetchCartData();
  //   }
  // }, [userInfo, dispatch]);

  const handleResetCart = async () => {
    try {
      const res = await fetch("/api/postgres", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userInfo ? userInfo.unique_id : "Anonymous",
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error response from server:", error);
        throw new Error(error.message || "Failed to reset cart.");
      }

      const result = await res.json();
      console.log("Reset cart response:", result);

      dispatch(resetCart());
      toast.success("Cart reset successfully!");
    } catch (error) {
      console.error("Error resetting cart:", error);
      toast.error(`An error occurred: ${(error as Error).message}`);
    }
  };

  const { productData } = useSelector((state: StateProps) => state?.shopping);
  return (
    <Container>
      {cartData.length > 0 ? (  
      
        <Container>
          <h2 className="font-bold text-5xl -mt-8 mb-2 font-logo text-orange-600">Cart</h2>
          <div className="flex flex-col gap-5">
            {cartData.map((product: IProduct) => (   
              <CartItem key={product.id} item={product} />
            ))}
            <div className="flex items-center justify-end">
              <Button
                variant="destructive"
                onClick={handleResetCart}
                className="bg-red-500 text-base font-semibold text-slate-100 py-2 px-6 hover:bg-red-700 hover:text-white duration-200"
              >
                Reset cart
              </Button>
            </div>
            {/* Payment Form */}
            <PaymentForm />
          </div>
        </Container>
      ) : (
        <div className="flex flex-col gap-y-6 items-center justify-center bg-white h-80 px-4">
          <p className="border-[1px] border-orange-600 w-full p-2 text-center">
            Your product cart is currently empty
          </p>
          <Link href={"/"}>
            <button className="bg-darkText font-bold text-white py-2 px-6 rounded-md hover:bg-orange-600 duration-200">
              Return to Shop
            </button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default CartPage;