"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { db, auth } from "@/src/config/FirebaseConfig";
import { addDoc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function InputUrls() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [errorAlertMessage, setErrorAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const handleSubmit = async () => {
    if (!title || !longUrl || !shortUrl || !user) return;

    setLoading(true);

    try {
      // Check if the shortUrl already exists in the database
      const q = query(collection(db, "shorturls"), where("shortUrl", "==", shortUrl));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If shortUrl already exists, show an alert message
        setErrorAlertMessage("This short url name is already in use.");
        setTimeout(() => {
          setErrorAlertMessage("");
        }, 3000);
      } else {
        // If shortUrl does not exist, proceed to save the new URL
        await addDoc(collection(db, "shorturls"), {
          title,
          longUrl,
          shortUrl,
          createdAt: serverTimestamp(),
          visitorCount: 0,
          uid: user.uid,
        });

        setAlertMessage("Your URL was saved successfully!");
        setTimeout(() => {
          setAlertMessage("");
          setTitle("");
          setLongUrl("");
          setShortUrl("");
          onOpenChange();
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        <i className="fa-solid fa-plus"></i>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              {alertMessage && (
                <>
                  <div className="flex fixed top-5 right-5 w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-center w-12 bg-emerald-500">
                  <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                  </svg>
                </div>

                <div className="px-4 py-2 -mx-3">
                  <div className="mx-3">
                    <span className="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
                    <p className="text-sm text-gray-600 dark:text-gray-200">{alertMessage}</p>
                  </div>
                </div>
              </div>
                </>
              )}
              {errorAlertMessage && (
                <>
                  <div className="flex fixed top-5 right-5 w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="flex items-center justify-center w-12 bg-red-500">
                      <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                      </svg>
                    </div>

                    <div className="px-4 py-2 -mx-3">
                      <div className="mx-3">
                        <span className="font-semibold text-red-500 dark:text-red-400">Error</span>
                        <p className="text-sm text-gray-600 dark:text-gray-200">{errorAlertMessage}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              <ModalHeader className="flex flex-col gap-1">Add Short URLs</ModalHeader>
              <ModalBody>
                <Input isRequired type="text" label="Title" placeholder="Hello World" variant="bordered" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <Textarea isRequired label="Your URLs" placeholder="Enter your long URLs" variant="bordered" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} required />
                <Input isRequired type="text" label="Your Shortened Direct" placeholder="Ex: HelloWorld" variant="bordered" value={shortUrl} onChange={(e) => setShortUrl(e.target.value)} required />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit} disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
