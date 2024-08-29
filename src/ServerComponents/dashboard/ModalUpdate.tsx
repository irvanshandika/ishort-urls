import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button } from "@nextui-org/react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/config/FirebaseConfig";

interface ModalUpdateProps {
  urlId: string;
  currentTitle: string;
  currentLongUrl: string;
  currentShortUrl: string;
  onClose: () => void;
}

const ModalUpdate: React.FC<ModalUpdateProps> = ({ urlId, currentTitle, currentLongUrl, currentShortUrl, onClose }) => {
  const [title, setTitle] = useState(currentTitle);
  const [longUrl, setLongUrl] = useState(currentLongUrl);
  const [shortUrl, setShortUrl] = useState(currentShortUrl);

  const handleUpdate = async () => {
    try {
      const urlDoc = doc(db, "shorturls", urlId);
      await updateDoc(urlDoc, {
        title,
        longUrl,
        shortUrl,
        updatedAt: serverTimestamp(),
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating URL: ", error);
    }
  };

  return (
    <Modal isOpen onOpenChange={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Update URL</ModalHeader>
          <ModalBody>
            <Input isRequired label="Title" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} variant="bordered" />
            <Input isRequired label="Long URL" placeholder="Enter long URL" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} variant="bordered" />
            <Input isRequired label="Short URL" placeholder="Enter short URL" value={shortUrl} onChange={(e) => setShortUrl(e.target.value)} variant="bordered" />
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleUpdate}>
              Update
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ModalUpdate;
