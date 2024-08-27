"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { db, auth } from "@/src/config/FirebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function InputUrls() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const handleSubmit = async () => {
    if (!title || !longUrl || !shortUrl || !user) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "shorturls"), {
        title,
        longUrl,
        shortUrl,
        createdAt: serverTimestamp(),
        visitorCount: 0,
        uid: user.uid,
      });

      setAlertMessage("URL Anda berhasil disimpan!");
      setTimeout(() => {
        setAlertMessage("");
        setLongUrl("");
        setShortUrl("");
        onOpenChange();
      }, 3000);
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

      {/* Alert Message */}
      {alertMessage && (
        <>
          <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg">{alertMessage}</div>
        </>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
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
