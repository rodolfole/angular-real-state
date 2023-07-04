import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent {

  @Input() showReset?: boolean;
  @Input() subtitle?: string = "Try changing or removing some of your filters.";
  @Input() title?: string = "No exact matches";
  @Output() clicked = new EventEmitter<string>();

}
