"use client";
import { useDispatch, useSelector } from "react-redux";
import { Product, StateProps } from "../type";
import { useEffect, useState } from "react";
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
import { resetOrder } from "@/redux/shoppingSlice";
import Link from "next/link";
import { urlForImage } from "../../sanity/lib/image";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderData } = useSelector((state: StateProps) => state?.shopping);

  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let amt = 0;
    orderData?.order?.map((item: Product) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalAmount(amt);
  }, [orderData.order]);

  return (
    <div>
      {orderData?.order?.length > 0 ? (
        <div>
          <div className="grid grid-cols-7 uppercase text-sm font-medium py-2 border-b-[1px] border-b-gray-300">
            <p className="col-span-4">Items</p>
            <p className="flex items-center justify-center hidden sm:block">Quantity</p>
            <p className="flex items-center justify-center block sm:hidden">Qty.</p>
            <p className="flex items-center justify-center hidden sm:block">Unit Price</p>
            <p className="flex items-center justify-center block sm:hidden">Per Unit</p>
            <p className="flex items-center justify-center">Amount</p>
          </div>
          <div className="py-2 flex flex-col justify-center gap-2">
            {orderData?.order?.map((item: Product) => (
              <div
                key={item?.id}
                className="py-2 border-b-[1px] border-gray-300 grid grid-cols-7 items-center"
              >
                <div className="col-span-4 flex items-start gap-2 text-sm">
                  <Image
                    src={urlForImage(item?.image).url()}
                    alt="product image"
                    width={500}
                    height={500}
                    className="w-12 h-12 object-cover"
                  />
                  <div>
                    <h3 className="text-base font-semibold mb-.5">
                      {item?.title}
                    </h3>
                    <p className="hidden sm:block">{item?.description}</p>
                  </div>
                </div>
                <p className="flex items-center justify-center">
                  {item?.quantity}
                </p>
                <p className="flex items-center justify-center">
                  <FormattedPrice amount={item?.price} />
                </p>
                <p className="flex items-center justify-center">
                  <FormattedPrice amount={item?.price * item.quantity} />
                </p>
              </div>
            ))}
          </div>
          <div className="text-lg font-medium py-2 border-b-[1px] border-b-gray-300">
            <p>Payment Details</p>
          </div>
          <p className="py-2">
            Total Paid{" "}
            <span className="text-xl font-semibold">
              <FormattedPrice amount={totalAmount} />
            </span>
          </p>
          <button
            onClick={() => dispatch(resetOrder())}
            className="text-white bg-red-500 hover:bg-red-700 mt-5 border-[1px] py-1 px-4 font-medium rounded-md hover:border-orange-600 cursor-pointer duration-200"
          >
            Reset Order
          </button>
        </div>
      ) : (
        <div className="py-14 bg-white text-black text-2xl text-center">
          <p>Nothing to show</p>
          <Link href={"/"}>
            <button className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold mt-2 hover:bg-orange-600 duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;