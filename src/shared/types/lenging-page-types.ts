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

export type { LocationTypes, ModalState, ApplyRequest };