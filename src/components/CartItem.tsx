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
import Link from "next/link";
import toast from "react-hot-toast";

const CartItem = ({ item }: any) => {
    const { productData } = useSelector((state: StateProps) => state?.shopping);
    const dispatch = useDispatch();

    const { userInfo }: any = useSelector(
        (state: StateProps) => state.shopping
    );

    const handleResetCart = async () => {
        const requestData = {
            product_id: item?.id,
            user_id: userInfo ? userInfo.unique_id : "Anonymous",
        };
        console.log("Request Data:", requestData);

        try {
            const res = await fetch("/api/postgres", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!res.ok) {
                const error = await res.json();
                console.error("Error response from server:", error);
                throw new Error(error.message || "Failed to reset cart.");
            }

            const result = await res.json();
            console.log("Reset cart response:", result);

            dispatch(deleteProduct(item?.id));
            toast.success("Cart reset successfully!");
        } catch (error) {
            console.error("Error resetting cart:", error);
            toast.error(`An error occurred: ${(error as Error).message}`);
        }
    };

    const handleUpdateQuantity = async (item: IProduct, newQuantity: number) => {
        const requestData = {
            product_id: item.id,
            user_id: userInfo ? userInfo.unique_id : "Anonymous",
            quantity: newQuantity,
        };

        try {
            const res = await fetch("/api/postgres", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!res.ok) {
                const error = await res.json();
                console.error("Error response from server:", error);
                throw new Error(error.message || "Failed to update quantity.");
            }

            const result = await res.json();
            console.log("Update quantity response:", result);

            // Dispatch Redux action to update the quantity in the store
            if (newQuantity > item.quantity) {
                dispatch(increaseQuantity({ id: item.id }));
            } else {
                dispatch(decreaseQuantity({ id: item.id }));
            }
            toast.success("Quantity updated successfully!");
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error(`An error occurred: ${(error as Error).message}`);
        }
    };

    return (
        <div className="flex flex-col gap-y-2">
            <div className="hidden lg:inline-flex items-center justify-between font-semibold bg-white p-2">
                <p className="w-1/3">Product</p>
                <p className="w-1/3 flex items-center justify-center">Quantity</p>
                <p className="w-1/3 flex items-center justify-end">Subtotal</p>
            </div>
            {/* Generate the product */}
            <div className="flex flex-col gap-y-2">
                <div
                    key={item.id}
                    className="w-full bg-white p-4 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-x-3 w-full md:w-1/3">
                        <span
                            onClick={handleResetCart}
                            className="text-lg hover:text-red-800 cursor-pointer duration-200"
                        >
                            <AiOutlineClose />
                        </span>
                        <Link href={{ pathname: `/product/${item?.id}` }}>
                            <Image
                                src={urlForImage(item?.image).url()}
                                width={500}
                                height={500}
                                alt="product image"
                                className="w-20 h-20 object-cover"
                                loading="lazy"
                            />
                        </Link>
                    </div>
                    {/* quantity */}
                    <div className="flex items-center justify-center gap-x-3 border-[1px] border-slate-300 py-2 px-4 w-full md:w-auto">
                        <p>Quantity</p>
                        <div className="flex items-center text-lg w-20 justify-between">
                            <span
                                onClick={() => {
                                    const newQuantity = item.quantity - 1;
                                    if (newQuantity > 0) {
                                        handleUpdateQuantity(item, newQuantity);
                                    }
                                }}
                                className="cursor-pointer"
                            >
                                <FiChevronLeft />
                            </span>
                            <span>{item?.quantity}</span>
                            <span
                                onClick={() => {
                                    const newQuantity = item.quantity + 1;
                                    handleUpdateQuantity(item, newQuantity);
                                }}
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
            </div>
        </div>
    );
};

export default CartItem;