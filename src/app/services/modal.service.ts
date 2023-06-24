import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastType = "Success" | "Info" | "Warning" | "Error";

export type LoginAction = "Login" | "Register";

interface Toast {
  type: ToastType,
  message: string
}

interface LoginModalData {
  showModal: boolean;
  action?: LoginAction;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private toast = new Subject<Toast>();
  private showModal = new Subject<LoginModalData>();

  setToast(type: ToastType, message: string) {
    this.toast.next({ type, message });
  }

  getToast() {
    return this.toast.asObservable();
  }

  setShowLoginModal(showModal: boolean, action?: LoginAction) {
    this.showModal.next({showModal, action});
  }

  getShowLoginModal() {
    return this.showModal.asObservable();
  }
}
