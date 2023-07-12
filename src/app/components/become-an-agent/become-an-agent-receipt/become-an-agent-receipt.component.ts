import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';

@Component({
  selector: 'app-become-an-agent-receipt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './become-an-agent-receipt.component.html',
  styleUrls: ['./become-an-agent-receipt.component.css']
})
export class BecomeAnAgentReceiptComponent {

  constructor(private becomeAnAgentService: BecomeAnAgentService) {
    this.becomeAnAgentService.emitFilterCategory.emit({ isStepIntro: true });
  }
}
