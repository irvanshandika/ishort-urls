/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/src/config/FirebaseConfig";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import InputUrls from "@/src/ServerComponents/dashboard/InputUrls";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { CopyDocumentIcon } from "@/src/components/icons/CopyDocumentIcon";
import { EditDocumentIcon } from "@/src/components/icons/EditDocumentIcon";
import { DeleteDocumentIcon } from "@/src/components/icons/DeleteDocumentIcon";
import Image from "next/image";

interface ShortUrl {
  id: string;
  title?: string;
  shortUrl?: string;
  createdAt?: { seconds: number };
  visitors?: number;
}

function ShortUrlsList() {
  const [user] = useAuthState(auth);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);
  const [totalShortUrls, setTotalShortUrls] = useState<number>(0);
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(collection(db, "shorturls"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const urls = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ShortUrl[];

        setShortUrls(urls);
        setTotalShortUrls(urls.length);
        setTotalVisitors(urls.reduce((acc, url) => acc + (url.visitors || 0), 0));
      }
    };

    fetchData();
  }, [user]);

  const handleCopy = (shortUrl: string, index: number) => {
    const domain = process.env.NODE_ENV === "production" ? "https://ishort.my.id" : "http://localhost:3000";
    const fullUrl = `${domain}/${shortUrl}`;

    navigator.clipboard.writeText(fullUrl);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "shorturls", id));
      setShortUrls(shortUrls.filter((url) => url.id !== id));

      window.location.reload();
    } catch (error) {
      console.error("Error deleting URL: ", error);
    }
  };

  return (
    <>
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Dashboard Summary</h2>
        <div className="flex justify-around text-center">
          <div>
            <h3 className="text-xl font-semibold text-blue-600">{totalShortUrls}</h3>
            <p className="text-gray-600">Total Short URLs</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600">{totalVisitors}</h3>
            <p className="text-gray-600">Total Visitors</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Your Short URLs</h2>
          <InputUrls />
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {shortUrls.map((url, index) => (
            <div key={url.id} className="bg-white shadow-md p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Title: {url.title || "Untitled"}</h3>
                <Dropdown>
                  <DropdownTrigger>
                    <button>
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                    <DropdownItem onClick={() => handleCopy(url.shortUrl || "", index)} key="copy" description="Copy the file link" startContent={<CopyDocumentIcon className={iconClasses} />}>
                      {copiedIndex === index ? "Copied!" : "Copy"}
                    </DropdownItem>
                    <DropdownItem key="edit" showDivider description="Allows you to edit the file" startContent={<EditDocumentIcon className={iconClasses} />}>
                      Edit file
                    </DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger" description="Permanently delete the file" startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />} onPress={onOpen}>
                      Delete URL
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-blue-500">
                  <span className="text-black">Your short url:</span> {url.shortUrl}
                </p>
              </div>
              <p className="text-gray-600 text-sm">Created: {url.createdAt ? new Date(url.createdAt.seconds * 1000).toLocaleDateString() : "N/A"}</p>
              <p className="text-gray-600 text-sm">Visitors: {url.visitors || 0}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete URL</ModalHeader>
              <ModalBody>
                <div className="flex justify-center items-center">
                  <Image
                    src="https://cdn3d.iconscout.com/3d/free/thumb/free-alert-folder-3d-icon-download-in-png-blend-fbx-gltf-file-formats--warning-caution-folders-pack-files-icons-5700814.png?f=webp"
                    alt="Warning"
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className="text-center">This URL will be removed from iShort permanently.</h3>
                <p className="text-center">
                  Enter the word "<strong>confirm</strong>" in the input below, if you agree.
                </p>
                <Input isRequired type="text" label="Confirmation" placeholder="Enter confirmation word" variant="bordered" required />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={() => handleDelete(shortUrls.find((url) => url.id)!.id)}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShortUrlsList;
