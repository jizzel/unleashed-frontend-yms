import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: false,

  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() isLoading: boolean | null = false;
  @Input() message?: string;
}
