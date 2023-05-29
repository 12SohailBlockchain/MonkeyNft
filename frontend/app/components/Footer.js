import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="py-5 bg-purple-400 text-center text-lg flex items-center space-x-8 justify-center">
      <p>© 2023 MonkeyNFT Minting Website. All rights reserved.</p>
      <Link href="https://github.com/rajaditya06/MonkeyNFT" target="_blank">
        <FaGithub className="text-[25px]" />
      </Link>
      <Link
        href="https://www.linkedin.com/in/aditya-raj-892813221/"
        target="_blank"
      >
        <FaLinkedin className="text-[25px]" />
      </Link>
    </div>
  );
};

export default Footer;
