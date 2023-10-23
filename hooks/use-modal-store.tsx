import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
    | "deleteMessage";
  
interface ModalData {
  server?: Server;
  channelType?: ChannelType;
  channel?: Channel;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface useModalStore {
    isOpen: boolean;
    data : ModalData
    type: ModalType | null;
    onOpen: (value: ModalType, data? : ModalData) => void;
    onClose: () => void;
}
export const useModal = create<useModalStore>((set) => ({
    isOpen: false,
    data : {},
    type: null,
    onOpen: (type: ModalType, data = {}) => set({ isOpen: true, type, data }),
    onClose : () => set({ isOpen : false })
}))