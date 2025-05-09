"use client"

import { Button } from "@/components/ui/button";
import { Modal } from "./Modal";
import { useState } from "react";

export const ModalExample = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Title"
          description="This is a description of the modal"
        >
          <p>Modal content goes here</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </>
    );
  };