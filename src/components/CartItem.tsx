import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../type";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
    decreaseQuantity,
    deleteProduct,
    increaseQuantity,
} from "@/redux/shoppingSlice";
import FormattedPrice from "./FormattedPrice";
import { urlForImage } from "../../sanity/lib/image";
import { Product as IProduct } from "@/type";

const CartItem = () => {
    const { productData } = useSelector((state: StateProps) => state?.shopping);
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col gap-y-2">
            <div className="hidden lg:inline-flex items-center justify-between font-semibold bg-white p-2">
                <p className="w-1/3">Product</p>
                <p className="w-1/3 flex items-center justify-center">Quantity</p>
                <p className="w-1/3 flex items-center justify-end">Subtotal</p>
            </div>
            {/* Generate the product */}
            <div className="flex flex-col gap-y-2">
                {productData?.map((item: IProduct) => (
                    <div
                        key={item.id}
                        className="w-full bg-white p-4 flex flex-col md:flex-row items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-x-3 w-full md:w-1/3">
                            <span
                                onClick={() => dispatch(deleteProduct(item?.id))}
                                className="text-lg hover:text-red-800 cursor-pointer duration-200"
                            >
                                <AiOutlineClose />
                            </span>
                            <Image
                                src={urlForImage(item?.image).url()}
                                width={500}
                                height={500}
                                alt="product image"
                                className="w-20 h-20 object-cover"
                                loading="lazy"
                            />
                        </div>
                        {/* quantity */}
                        <div className="flex items-center justify-start gap-x-3 border-[1px] border-slate-300 py-2 px-4 w-full md:w-auto">
                            <p>Quantity</p>
                            <div className="flex items-center text-lg w-20 justify-between">
                                <span
                                    onClick={() => dispatch(decreaseQuantity(item))}
                                    className="cursor-pointer"
                                >
                                    <FiChevronLeft />
                                </span>
                                <span>{item?.quantity}</span>
                                <span
                                    onClick={() => dispatch(increaseQuantity(item))}
                                    className="cursor-pointer"
                                >
                                    <FiChevronRight />
                                </span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 flex items-end justify-start md:justify-end">
                            <p className="text-lg font-semibold">
                                <FormattedPrice amount={item?.price * item?.quantity} />
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartItem;