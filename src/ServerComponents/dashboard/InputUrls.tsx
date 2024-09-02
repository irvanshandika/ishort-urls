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
                  <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg">{alertMessage}</div>
                </>
              )}
              {errorAlertMessage && (
                <>
                  <div className="fixed top-5 right-5 bg-red-500 text-white p-4 rounded-lg shadow-lg">{errorAlertMessage}</div>
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
