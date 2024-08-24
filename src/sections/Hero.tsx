import React from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Illustration from "@/src/components/images/Illustration.webp";

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-sky-300 text-white py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section - Headline and Description */}
        <div className="md:w-1/2 flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Simplify Your Links with <span className="text-yellow-300">iShort URLs</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">Tired of long and confusing URLs? With iShort URLs, you can easily shorten your links for a clean and concise look.</p>
          <form className="w-full max-w-md flex items-center mb-6">
            <input type="text" placeholder="Paste your long URL here" className="w-full py-[7px] px-4 rounded-lg text-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-300" />
            <Button className="bg-yellow-300 text-gray-900 font-semibold ml-3 rounded-lg hover:bg-yellow-400 transition duration-300 ease-in-out">Shorten URL</Button>
          </form>
          <p className="text-sm">Sign up your account to enjoy unlimited url shortening</p>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <Image src={Illustration} alt="URL Shortening Illustration" width={500} height={500} />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
