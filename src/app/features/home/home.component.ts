import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, ButtonModule, InputTextModule],
})
export class HomeComponent {
  inputValues: string = '';
  inputValue(event: KeyboardEvent) {
    if (this.inputValues.length == 4) {
      return;
    }
    this.inputValues += event.key;
    console.log(event.key);
    if (this.inputValues.length == 4) {
      this.login();
    }
  }

  login() {
    console.log(this.inputValues);
  }

  // clear() {
  //   this.
  // }
}
