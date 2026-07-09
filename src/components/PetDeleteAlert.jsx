import React from "react";
import { AlertDialog, Button } from "@heroui/react";

export default function PetDeleteAlert({ isOpen, onClose, onConfirm, petName }) {
  if (!isOpen) return null;

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onClose}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger onClick={onClose} />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Pet Listing?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Are you sure you want to permanently delete <strong>{petName}</strong>? This action cannot be undone and all data will be lost.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button variant="tertiary" onClick={onClose}>
                No, Keep It
              </Button>
              <Button variant="danger" onClick={onConfirm}>
                Yes, Delete Pet
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}