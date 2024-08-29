/* eslint-disable react/no-unescaped-entities */
// ModalDelete.tsx
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import Image from "next/image";

interface ModalDeleteProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleDelete: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ isOpen, onOpenChange, handleDelete }) => {
  return (
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
              <Button color="danger" onPress={handleDelete}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDelete;
