import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService, type ToastType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent {

  type: ToastType = "Warning";
  message: string = "";
  isOpen: boolean = false;
  timeoutId: number = 0;

  $toast: Subscription | null = null;;

  constructor(private toastService: ToastService) {
    this.$toast = this.toastService.getToast().subscribe(({ type, message }) => {
      this.type = type;
      this.message = message;
      this.isOpen = true;
      this.closeToastAfterDelay();
    });
  }

  ngOnDestroy(): void {
    this.$toast?.unsubscribe();
  }

  handleOnClick(e: MouseEvent) {
    this.isOpen = false;
    clearTimeout(this.timeoutId);
  }

  closeToastAfterDelay() {
    this.timeoutId = setTimeout(() => {
      this.isOpen = false;
    }, 3000);
  }
}
