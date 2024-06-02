import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';

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
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule
  ],
  providers: [UserState],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  headerLogo = "./assets/img/logo.png";
  userState = inject(UserState);
  // status$ = this.userState.status$;
  userSignupForm = new FormGroup({
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
    phonenumber: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    confirmPassword: new FormControl<string | null>(null, {
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
    if (formValues.password != formValues.confirmPassword) {
      alert();
      return;
    }
    this.userState
      .signup({
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        email: formValues.email,
        phonenumber: formValues.phonenumber,
        password: formValues.password,
      })
      .then(() => {
        this.refresh();
      });
  }
}
