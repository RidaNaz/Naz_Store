"use client";
import {
  BsYoutube,
  BsGithub,
  BsLinkedin,
  BsFacebook,
  BsReddit,
  BsInstagram,
} from "react-icons/bs";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import payment from "@/images/payment.png";
import { signIn } from "next-auth/react";

const Footer = () => {
  return (
    <div className="w-full bg-darkText text-slate-100">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="flex flex-row justify-center gap-8 sm:flex-col col-span-2 gap-y-4">
          <Image
            src="/Rida logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="cursor-pointer hover:animate-slowspin"
          />
          <p className="hidden sm:block">
          As a skilled web developer and With a passion for building innovative and user-friendly digital experiences, I craft websites and applications that engage and inspire. Proficient in a range of programming languages and technologies, I stay up-to-date with industry trends to deliver cutting-edge solutions.
          </p>
          <div className="flex items-center gap-x-4">
            <Link href="https://www.youtube.com/channel/UCeefB9tbNPO0zTaSyzR_PCA">
              <span className="socialLink">
                <BsYoutube />
              </span>
            </Link>
            <Link href="https://github.com/RidaNaz">
              <span className="socialLink">
                <BsGithub />
              </span>
            </Link>
            <Link href="https://www.linkedin.com/in/ridanaz67/">
              <span className="socialLink">
                <BsLinkedin />
              </span>
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=100082363551016">
              <span className="socialLink">
                <BsFacebook />
              </span>
            </Link>
            <Link href="https://www.instagram.com/rida_naz67/">
              <span className="socialLink">
                <BsInstagram />
              </span>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xl font-bold underline mb-4">Projects</p>
          <ul className="text-sm font-light mt-2 flex flex-col gap-y-2">
            <Link href="https://rida-portfolio-virid.vercel.app/" target="_blank">
            <li className="flex flex-col">
              <span className="text-lg font-semibold text-slate hover:text-orange-600 cursor-pointer duration-200">
              Portfolio Website
              </span>
              <span className="text-orange-600">February 25, 2024</span>
            </li>
            </Link>
            <Link href="https://rida-portfolio-2.vercel.app/" target="_blank">
            <li className="flex flex-col">
              <span className="text-lg font-semibold text-slate hover:text-orange-600 cursor-pointer duration-200">
                Portfolio Website
              </span>
              <span className="text-orange-600">April 7, 2024</span>
            </li>
            </Link>
            <Link href="https://its-naz-gallery.vercel.app/" target="_blank">
            <li className="flex flex-col">
              <span className="text-lg font-semibold text-slate hover:text-orange-600 cursor-pointer duration-200">
                Gallery Website
              </span>
              <span className="text-orange-600">April 28, 2024</span>
            </li>
            </Link>
          </ul>
        </div>
        <div >
          <p className="text-xl font-bold underline mb-4 ">Links</p>
          <ul className="text-lg font-medium mt-2 flex flex-col gap-y-2">
            <Link href={"/"}>
              <li className="hover:text-orange-500 cursor-pointer duration-200">
                Home
              </li>
            </Link>
            <Link href={"/cart"}>
              <li className="hover:text-orange-500 cursor-pointer duration-200">
                Cart
              </li>
            </Link>
            <Link href={"/order"}>
              <li className="hover:text-orange-500 cursor-pointer duration-200">
                Order
              </li>
            </Link>
            <Link href="https://www.linkedin.com/in/ridanaz67/recent-activity/articles/">
            <li className="hover:text-orange-500 cursor-pointer duration-200">
              Articles
            </li>
            </Link>
          </ul>
        </div>
        <div className="items-center">
        <p className="text-2xl font-bold underline mb-4">Pay</p>
          <p className="text-lg mb-2">with your trusted services</p>
          <Image
            src={payment}
            alt="payment banner image"
            width={400}
            height={400}
            className="w-full h-10 object-cover"
          />
        </div>
      </Container>
      <div className="flex justify-center gap-10 -mt-[1.4rem] w-[80%] mx-auto text-white opacity-70">
                &#169; Naz_Store 2024 Inc. all rights reserved
            </div>
    </div>
  );
};

export default Footer;