import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';

import {
  BehaviorSubject,
  Subject,
  debounceTime,
  filter,
  lastValueFrom,
  map,
  take,
  takeUntil,
} from 'rxjs';

import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { UserState } from '@app/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userState = inject(UserState);

  userSignupForm = new FormGroup({
    username: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    firstname: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastname: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  private refresh$ = new Subject<void>();

  refresh(): void {
    this.refresh$.next();
  }

  signup() {
    const formValues = this.userSignupForm.getRawValue();
    this.userState
      .signup({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      })
      .then(() => {
        this.refresh();
      });
  }
}
