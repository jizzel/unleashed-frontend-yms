import {Component, Input} from '@angular/core';
import {Form} from '../../../../core/models/form.interface';

@Component({
  selector: 'app-review',
  standalone: false,

  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() form: Form | null = null;

}
