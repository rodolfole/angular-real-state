import { Pipe, PipeTransform } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Pipe({
  name: 'base64Image',
  standalone: true
})
export class Base64ImagePipe implements PipeTransform {

  transform(file: File): Observable<string> {
    const base64Image = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => base64Image.next(reader.result?.toString() || "");
    reader.onerror = error => base64Image.next("");
    return base64Image;
  }

}
