import React from "react";
import NavigasiBar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | iShort URLs",
};

function ContactPage() {
  return (
    <>
      <NavigasiBar />
      <div className="flex flex-col items-center justify-center mt-[10vh]">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg text-gray-500 text-center">Feel free to reach out to us for any questions or inquiries.</p>
        <div className="flex flex-col gap-6 mt-8">
          <input type="text" placeholder="Name" className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-400" />
          <input type="email" placeholder="Email" className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-400 mt-4" />
          <textarea placeholder="Message" className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-400 h-32" rows={5}></textarea>
          <button className="w-full px-4 py-2 text-white bg-blue-400 rounded-md hover:bg-blue-500">Submit</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
