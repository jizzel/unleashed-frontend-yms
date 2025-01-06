import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: false,

  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {
  @Input() message = '';
  @Input() type: 'error' | 'warning' | 'success' = 'error';

  dismiss(): void {
    this.message = '';
  }
}
