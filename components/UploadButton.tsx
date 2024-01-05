"use client";

import { useState } from "react";
import { Dialog,DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";

export const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const UploadDropZone = () => {
    return <Dropzone multiple={false}>
      {({getRootProps, getInputProps, acceptedFiles}) => (
        <div {...getRootProps()} className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"></div>
      )}
    </Dropzone>
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(visible) => {
        if (!visible) {
          setIsOpen(visible);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropZone/>
      </DialogContent>
    </Dialog>
  );
};
