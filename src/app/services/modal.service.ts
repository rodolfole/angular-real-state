import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastType = "Success" | "Info" | "Warning" | "Error";

export type LoginAction = "Login" | "Register";

interface Toast {
  type: ToastType,
  message: string
}

interface ModalProps {
  showModal: boolean;
  isExpanded?: boolean;
  content: TemplateRef<any> | null;
  index?: number
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private toast = new Subject<Toast>();
  private showModal = new Subject<ModalProps>();

  setToast(type: ToastType, message: string) {
    this.toast.next({ type, message });
  }

  getToast() {
    return this.toast.asObservable();
  }

  setShowModal(props: ModalProps) {
    this.showModal.next(props);
  }

  getShowModal() {
    return this.showModal.asObservable();
  }
}
