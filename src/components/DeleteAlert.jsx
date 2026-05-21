import React from "react";
import { AlertDialog, Button } from "@heroui/react";

export default function DeleteAlert({ isOpen, onClose, onConfirm, petName }) {
  if (!isOpen) return null;

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onClose}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger onClick={onClose} />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel Adoption Request?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Are you sure you want to cancel the adoption request for{" "}
                <strong>{petName}</strong>? This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button variant="tertiary" onClick={onClose}>
                No, Keep It
              </Button>
              <Button variant="danger" onClick={onConfirm}>
                Yes, Cancel Request
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}