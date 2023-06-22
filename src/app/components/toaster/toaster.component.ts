import { Component, Input } from '@angular/core';

type ToastType = "Success" | "Info" | "Warning" | "Error";

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent {

  @Input() type : ToastType = "Info";
  @Input() title: string = "";
  @Input() message?: string;

}
