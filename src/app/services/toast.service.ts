import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastType = "Success" | "Info" | "Warning" | "Error";

interface Toast {
  type: ToastType,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private toast = new Subject<Toast>();

  setToast(type: ToastType, message: string) {
    this.toast.next({ type, message });
  }

  getToast() {
    return this.toast.asObservable();
  }
}
