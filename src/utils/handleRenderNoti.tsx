import { toast, TypeOptions } from "react-toastify";

export const handleRenderNoti = (message: string, type: TypeOptions): void => {
  toast(message, {
    type: type,
  });
  toast.clearWaitingQueue();
};
