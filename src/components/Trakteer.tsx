import React from "react";
import TrakteerIcon from "./icons/TrakteerIcon";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

function Trakteer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <button onClick={onOpen}>
        <TrakteerIcon className="lg:w-20 lg:translate-y-[3px] w-20" />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Support Me on Trakteer</ModalHeader>
              <ModalBody>
                <iframe src="https://trakteer.id/irvan_s2/tip/embed/modal" className="lg:w-[26.5vw] w-full h-[60vh]"></iframe>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Trakteer;
