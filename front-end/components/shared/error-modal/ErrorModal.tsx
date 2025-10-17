import React, { ReactNode } from "react";
import { Dialog } from "primereact/dialog";
import { BugAntIcon } from "@heroicons/react/24/solid";
import { Button } from "primereact/button";

interface ErrorModalProps {
  error: string | ReactNode | null;
  visible: boolean;
  onClose: () => void;
}

const ErrorModal = ({ error, visible, onClose }: ErrorModalProps) => {
  const header = (
    <div className="font-primary align-center flex h-[20px] gap-1.5 text-2xl text-red-700/70">
      <BugAntIcon />
      <BugAntIcon className="-rotate-90" />
      <BugAntIcon className="-rotate-90" />
      <BugAntIcon className="-rotate-90" />
      <BugAntIcon className="-rotate-90" />
      <BugAntIcon className="-rotate-90" />
      {/* <BugAntIcon className="rotate-45" />
      <BugAntIcon className="-rotate-70" />
      <BugAntIcon />
      <BugAntIcon className="-rotate-140" />
      <BugAntIcon className="-rotate-45" /> */}
    </div>
  );

  return (
    <Dialog
      header={header}
      visible={visible}
      className="[&_[data-pc-section=header]]:border-b-primary-900/20 w-[300px] md:w-[450px] [&_[data-pc-section=closebutton]]:text-red-500 [&_[data-pc-section=header]]:border-b-1"
      onHide={() => {
        if (!visible) return;
        onClose();
      }}
    >
      <div className="relative py-8 pb-9 text-center text-xl font-bold text-red-500">
        <BugAntIcon
          width={18}
          height={18}
          className="absolute bottom-[70px] -left-[1px] rotate-145 text-red-700/20"
        />
        <BugAntIcon
          width={18}
          height={18}
          className="absolute -top-[8px] right-[24%] rotate-210 text-red-700/20"
        />
        {error}
        <BugAntIcon
          width={18}
          height={18}
          className="absolute right-[5px] bottom-[30px] rotate-45 text-red-700/20"
        />
        <div className="mt-8 text-center">
          <Button
            label="OK"
            className="font-primary h-[42px] py-0! text-2xl!"
            onClick={onClose}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ErrorModal;
