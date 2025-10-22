interface LocationTypes {
  id: number;
  title: string;
  fullLocation: string;
  receiver: string;
  marks: string;
  transport: string;
}
interface ModalState {
  open: boolean;
  setOpen: (value: boolean) => void;
}
interface ApplyRequest {
  name: string;
  phone: string;
  message: string;
}

interface SendRequest {
  fromLocation: string;
  toLocation: string;
  weight: number;
  bulk: number;
  density: number;
  containerType: string;
  customs: boolean;
  price: number;
}
export type { LocationTypes, ModalState, ApplyRequest, SendRequest };
