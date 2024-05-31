"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { IoMdCart } from "react-icons/io";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import FormattedPrice from "./FormattedPrice";
import Link from "next/link";
import { addUser, deleteUser } from "@/redux/shoppingSlice";
import { BsBookmarks } from "react-icons/bs";
import { Product, StateProps } from "@/type";
import Logo from "./Logo";

const Header = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { productData, orderData } = useSelector(
    (state: StateProps) => state.shopping
  );

  useEffect(() => {
    if (session) {
      dispatch(
        addUser(session?.user)
      );
    } else {
      dispatch(deleteUser());
    }
  }, [session, dispatch]);

  const [totalAmt, setTotalAmt] = useState(0);

  useEffect(() => {
    let amt = 0;
    productData.map((item: Product) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalAmt(amt);
  }, [productData]);

  return (
    <div className="bg-darkText h-20 top-0 sticky z-50">
      <Container className="h-full flex items-center md:gap-x-5 justify-between md:justify-start">
        <Logo />
        {/* Search Field */}
        <div className="w-full bg-white hidden md:flex items-center gap-x-1 border-[1px] border-lightText/50 rounded-full px-4 py-1.5 focus-within:border-orange-600 group">
          <FiSearch className="text-gray-500 group-focus-within:text-darkText duration-200" />
          <input
            type="text"
            placeholder="Search for products"
            className="placeholder:text-sm flex-1 outline-none"
          />
        </div>
        {/* Cart button */}
        <div>
          <Link href={"/cart"}>
            <div className="bg-white hover:bg-darkText rounded-full text-black hover:text-white flex items-center justify-center gap-x-1 px-3 py-1.5 border-[1px] border-orange-600 hover:border-white duration-200 relative">
              <p className="text-sm font-semibold">
                <FormattedPrice amount={totalAmt ? totalAmt : 0} />
              </p>
              <IoMdCart className="text-xl" />
              <span className="bg-white text-orange-600 rounded-full text-xs font-semibold absolute -right-2 -top-1 w-5 h-5 flex items-center justify-center shadow-xl shadow-black border-[0.2px] border-orange-600">
                {productData ? productData?.length : 0}
              </span>
            </div>
          </Link>
        </div>
        {/* Login/Register */}
        {!session && (
          <div onClick={() => signIn()} className="headerDiv cursor-pointer bg-orange-600 text-white hover:text-darkText">
            <AiOutlineUser className="text-2xl" />
            <p className="text-sm font-semibold">Login</p>
          </div>
        )}
        {/* Order button */}
        {orderData?.order?.length > 0 && session && (
          <Link
            href={"/order"}
            className="headerDiv px-2 gap-x-1 cursor-pointer bg-orange-600 text-white hover:text-darkText"
          >
            <BsBookmarks className="text-xl" />
            {/* <p className="text-sm font-semibold">Orders</p> */}
          </Link>
        )}
        {/* user Image */}
        {session && (
          <Image
            src={session?.user?.image as string}
            alt="user image"
            width={45}
            height={45}
            className="rounded-full object-cover "
          />
        )}
        {/* Logout button */}
        {session && (
          <div
            onClick={() => signOut()}
            className="headerDiv px-1 gap-x-1 cursor-pointer text-white hover:text-darkText bg-orange-600 hover:bg-white"
          >
            <FiLogOut className="text-sm" />
          </div>
        )}
      </Container>
    </div>
  );
};

export default Header;