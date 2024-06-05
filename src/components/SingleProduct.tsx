"use client";

import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
import { IoMdCart } from "react-icons/io";
import { urlForImage } from "../../sanity/lib/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/shoppingSlice";
import toast, { Toaster } from "react-hot-toast";
import { StateProps } from "@/type";

const SingleProduct = ({ product }: any) => {
  const dispatch = useDispatch();

  const { userInfo }: any = useSelector(
    (state: StateProps) => state.shopping
  );
  const handleAddToCart = async () => {
    try {
      const res = await fetch("/api/postgres", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: product?.id,
          user_id: userInfo ? userInfo.unique_id : "Anonymous",
          quantity: 1  // Default quantity to add
        })
      });
      const result = await res.json();
      console.log(result);

      if (res.ok) {
        dispatch(addToCart({ ...product, quantity: 1 }));
        toast.success(`${product?.title.substring(0, 15)} added successfully!`);
      } else {
        toast.error("Failed to add item to cart.");
      }
    } catch (error) {
      console.log("Error adding to cart:", error);
      toast.error("An error occurred while adding item to cart.");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-5 bg-white p-4 rounded-lg">
      <div>
        <Image
          src={urlForImage(product?.image).url()}
          alt="product image"
          width={500}
          height={500}
          className="w-full max-h-[700px] object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-center gap-y-10">
        <div>
          <p className="text-3xl font-semibold">{product?.title}</p>
          <p className="text-xl font-semibold">
            <FormattedPrice amount={product?.price} />
          </p>
        </div>
        <p className="text-lightText">{product?.description}</p>
        <div className="text-sm text-lightText flex flex-col">
          <span>
            SKU: <span className="text-darkText">{product?.id}</span>
          </span>
          <span>
            Category: <span className="text-darkText">{product?.category.name}</span>
          </span>
        </div>
        <div
          onClick={handleAddToCart}
          className="flex items-center cursor-pointer group"
        >
          <button className="bg-darkText text-slate-100 px-6 py-3 text-sm uppercase flex items-center border-r-[1px] border-r-slate-500 font-bold" >
            Add to cart
          </button>
          <span className="bg-darkText text-xl text-slate-100 w-12 flex items-center justify-center group-hover:bg-orange-600 duration-200 py-3">
            <IoMdCart />
          </span>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SingleProduct;