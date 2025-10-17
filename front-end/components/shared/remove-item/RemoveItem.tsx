import React from "react";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { removeItem } from "@/front-end/utils/collection";

type UpdateFn<T> = (key: string, value: T[]) => void;

export interface FormRenderProps {
  confirmRemove: <T extends { id: string | number }>(
    arr: T[],
    id: string | number,
    key: string,
    fn: UpdateFn<T>,
  ) => (event: React.MouseEvent) => void;
}

export interface CustomFormProps {
  children: (props: FormRenderProps) => React.ReactNode;
}

const RemoveItem = ({ children }: CustomFormProps) => {
  const confirmRemove =
    <T extends { id: string | number }>(
      arr: T[],
      id: string | number,
      key: string,
      fn: UpdateFn<T>,
    ) =>
    (event: React.MouseEvent) => {
      confirmPopup({
        target: event.currentTarget as HTMLElement,
        message: `Are you sure you want to remove it?`,
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          removeItem(arr, id, key, fn);
        },
      });
    };
  const renderProps: FormRenderProps = {
    confirmRemove,
  };

  return (
    <>
      <ConfirmPopup />
      {children(renderProps)}
    </>
  );
};

export default RemoveItem;
