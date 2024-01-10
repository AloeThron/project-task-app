"use client";

import Image from "next/image";


import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDelayModal } from "@/hooks/use-delay-modal";

export function ProModal() {
  const delayModal = useDelayModal();

  return (
    <Dialog open={delayModal.isOpen} onOpenChange={delayModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/hero.svg" alt="Hero" className="object-cover" fill />
        </div>
      </DialogContent>
    </Dialog>
  );
}
