import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

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
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    CheckboxModule,
    FormsModule,
    DropdownModule,
  ],
  providers: [UserState],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  headerLogo = './assets/img/logo.png';
  userState = inject(UserState);

  userSigninForm = new FormGroup({
    email: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  private refreshTriggered$ = new BehaviorSubject<number>(0);

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  ngOnInit() {}

  refresh(): void {
    this.refreshTriggered$.next(new Date().getTime());
  }

  signin() {
    const formValues = this.userSigninForm.getRawValue();
    this.userState
      .signin(formValues.email ?? '', formValues.password ?? '')
      .then(() => {
        this.refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
