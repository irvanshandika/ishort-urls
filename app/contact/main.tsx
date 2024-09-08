"use client";
import React, { useState } from "react";
import { db } from "@/src/config/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "@nextui-org/react";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Save data to Firestore
      await addDoc(collection(db, "contact"), {
        firstName,
        lastName,
        email,
        company,
        subject,
        message,
        createdAt: new Date(),
      });

      // Show success alert and reset form
      toast.success("Message sent successfully!", {
        icon: "🚀",
        duration: 3000,
      });
      setTimeout(() => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setCompany("");
        setSubject("");
        setMessage("");
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Failed to send message. Please try again later.", {
        icon: "🚨",
        duration: 3000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
        <p className="text-center text-gray-600 mb-8">Feel free to report a bug or reach out for collaboration.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Last Name" className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <input type="email" placeholder="Email" className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Company (Optional)" className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" value={company} onChange={(e) => setCompany(e.target.value)} />
          <input type="text" placeholder="Subject" className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          <textarea rows={6} placeholder="Your Message" className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" value={message} onChange={(e) => setMessage(e.target.value)} required />
          <Button type="submit" className="w-full py-3 bg-yellow-300 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition duration-300 ease-in-out">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
