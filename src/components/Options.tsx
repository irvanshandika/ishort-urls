import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import { AddNoteIcon } from "./icons/AddNoteIcon";
import { CopyDocumentIcon } from "./icons/CopyDocumentIcon";
import { EditDocumentIcon } from "./icons/EditDocumentIcon";
import { DeleteDocumentIcon } from "./icons/DeleteDocumentIcon";

export default function Options() {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <button>
        <i className="fa-solid fa-ellipsis"></i>
        </button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownItem key="new" description="Create a new short URL" startContent={<AddNoteIcon className={iconClasses} />}>
          New Short URL
        </DropdownItem>
        <DropdownItem key="copy" description="Copy the file link" startContent={<CopyDocumentIcon className={iconClasses} />}>
          Copy link
        </DropdownItem>
        <DropdownItem key="edit" showDivider description="Allows you to edit the file" startContent={<EditDocumentIcon className={iconClasses} />}>
          Edit file
        </DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" description="Permanently delete the file" startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}>
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
