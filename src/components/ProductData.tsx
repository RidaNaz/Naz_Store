"use client";

import Image from "next/image";
import { ItemProps, StateProps } from "../type";
import { calculatePercentage, getSingleProduct } from "@/helpers";
import FormattedPrice from "./FormattedPrice";
import { IoIosStar } from "react-icons/io";
import Link from "next/link";
import { urlForImage } from "../../sanity/lib/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCartData } from "@/redux/shoppingSlice";
import toast, { Toaster } from "react-hot-toast";
import { setUserId } from "@/redux/userSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const ProductsData = ({ item }: ItemProps) => {
    const dispatch = useDispatch();
    const { data: session } = useSession();
  const { userInfo }: any = useSelector(
    (state: StateProps) => state.shopping
  );

  useEffect(() => {
      const fetchCartData = async () => {
        try {
          const response = await fetch(`/api/postgres?user_id=${userInfo ? userInfo.unique_id : "Anonymous"}`);
          if (!response.ok) {
            throw new Error("Failed to fetch cart data");
          }
          const data = await response.json();
          const cartProduct = await data.allCartData.map(async (item: any) => await getSingleProduct(Number(item.product_id)));
  
          const cartProducts = await Promise.all(cartProduct);
          
          const combinedData = data.allCartData.map((cartItem: any, index: number) => ({
            ...cartProducts[index],
            quantity: cartItem.quantity
          }));
          dispatch(setCartData(combinedData));
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
  
      if (userInfo) {
        fetchCartData();
      }
    }, [userInfo, dispatch]);

    const startArray = Array.from({ length: item?.rating }, (_, index) => (
        <span key={index} className="text-yellow-400">
            <IoIosStar />
        </span>
    ));


    const handleAddToCart = async () => {
        try {
            const res = await fetch("/api/postgres", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: item.id, 
                    user_id: userInfo ? userInfo.unique_id : "Anonymous",
                })
            });
            const result = await res.json();
            console.log(result);

                if (res.ok) {
                    dispatch(addToCart(item));
                    toast.success(`${item?.title.substring(0, 15)} added successfully!`);
                } else {
                    toast.error("Failed to add item to cart.");
                }
        } catch (error) {
            console.log("Error adding to cart:", error);
            toast.error("An error occurred while adding item to cart.");
        }
    };

    return (
        <div className="w-full rounded-lg overflow-hidden">
            <div>
                <Link href={{ pathname: `/product/${item?.id}` }}>
                    <div className="w-full h-96 group overflow-hidden relative">
                        {item.image && (
                        <Image
                            src={urlForImage(item?.image).url()}
                            alt="product image"
                            width={500}
                            height={500}
                            className="w-full h-full object-cover group-hover:scale-110 duration-200 rounded-t-lg"
                        />)}
                        {item?.isNew && (
                            <span className="absolute top-2 right-2 font-medium text-xs py-1 px-3 rounded-full bg-white group-hover:bg-orange-600 group-hover:text-white duration-200">
                                New Arrival
                            </span>
                        )}
                    </div>
                </Link>
                <div className="border-[1px] border-slate-300 border-t-0 px-2 py-4 flex flex-col gap-y-2 bg-white rounded-b-lg">
                    <p className="font-bold">{item?.title}</p>
                    <div className="flex items-center justify-between">
                        <div className="border-[1px] border-orange-600 py-1 px-4 rounded-full text-xs">
                            <p>{calculatePercentage(item?.price, item?.oldPrice)}% off</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <p className="text-slate-500 line-through text-sm">
                                <FormattedPrice amount={item?.oldPrice} />
                            </p>
                            <p className="font-semibold">
                                <FormattedPrice amount={item?.price} />
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        {/* add to cart button */}
                        <button
                            onClick={handleAddToCart}
                            className="bg-orange-600 px-4 py-2 text-sm tracking-wide rounded-full text-slate-100 hover:bg-orange-800 hover:text-white duration-200"
                        >
                            Add to cart
                        </button>
                        {/* star icons */}
                        <div className="flex items-center gap-x-1">{startArray}</div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default ProductsData;