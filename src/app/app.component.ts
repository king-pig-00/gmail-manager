import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimengUI } from './app.primeng';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrimengUI],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Gru';
}
