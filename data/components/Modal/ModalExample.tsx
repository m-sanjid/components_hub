"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "./Modal";
import { useState } from "react";
import { IconX } from "@tabler/icons-react";

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

export const ComplexModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Complex Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
        size="lg"
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <div className="flex items-center gap-2 text-destructive">
              <IconX className="h-5 w-5" />
              <h4 className="font-medium">Warning</h4>
            </div>
            <p className="mt-2 text-sm text-destructive">
              Deleting your account will permanently remove all your data and
              cannot be recovered.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Type "DELETE" to confirm
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Type DELETE to confirm"
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsOpen(false)}>
              Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
