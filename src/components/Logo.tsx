import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <h3 className="font-logo text-3xl text-orange-500 hover:text-white cursor-pointer duration-200">
        naz_Store.
      </h3>
    </Link>
  );
};

export default Logo;