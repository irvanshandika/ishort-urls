"use client";
import React, { useState } from "react";
import { db } from "@/src/config/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "@nextui-org/react";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

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
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setCompany("");
        setSubject("");
        setMessage("");
        window.location.reload();
      }, 3000);
    } catch (error) {
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
        <p className="text-center text-gray-600 mb-8">Feel free to report a bug or reach out for collaboration.</p>

        {successAlert && (
          <div className="bg-green-500 text-white text-center p-3 rounded mb-4">
            Your message has been sent successfully!
          </div>
        )}

        {errorAlert && (
          <div className="bg-red-500 text-white text-center p-3 rounded mb-4">
            There was an error sending your message. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="First Name"
              className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Company (Optional)"
            className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            rows={6}
            placeholder="Your Message"
            className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full py-3 bg-yellow-300 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition duration-300 ease-in-out"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
