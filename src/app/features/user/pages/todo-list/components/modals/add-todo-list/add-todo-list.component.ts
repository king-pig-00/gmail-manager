import { Component, inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { UIState, ToDoListState } from '../../../state';
import {
  map,
  distinctUntilChanged,
  BehaviorSubject,
  Subject,
  takeUntil,
} from 'rxjs';

import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CalendarModule } from 'primeng/calendar';

import { ToDoListItem, ToDoListConfig, ToDoListService } from '@app/core';

@Component({
  standalone: true,
  selector: 'app-add-todo-list-modal',
  templateUrl: './add-todo-list.component.html',
  styleUrls: ['./add-todo-list.component.scss'],
  imports: [
    ReactiveFormsModule,
    DialogModule,
    CommonModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    InputIconModule,
    IconFieldModule,
    InputGroupModule,
    DropdownModule,
    CalendarModule,
    InputGroupAddonModule,
  ],
})
export class AddNewToDoListModalComponent {
  uiState = inject(UIState);
  toDoListState = inject(ToDoListState);
  addNewToDoList$ = this.uiState.modals$.pipe(
    map((modals) => modals.addNewToDoList),
    distinctUntilChanged()
  );

  isOpen$ = this.addNewToDoList$.pipe(map((modal) => modal.isOpen));
  status$ = this.toDoListState.status$.pipe(map((status) => status.save));

  addNewToDoListForm = new FormGroup({
    title: new FormControl<string | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl<string | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    date: new FormControl<Date | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    fromHours: new FormControl<string | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    fromMinutes: new FormControl<string | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    toHours: new FormControl<string | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    toMinutes: new FormControl<string | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    state: new FormControl<number | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    urgent: new FormControl<number | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  private destroyed$ = new Subject<void>();

  ngOnInit(): void {
    // this.toDoListState.tourDetails$
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe((tourDetails) => {
    //     if (tourDetails) {
    //       this.tourItineraryList = tourDetails.tourItineraryList || [];
    //       const orderOptions: orderOption[] = [];
    //       for (let i = 1; i <= tourDetails.tourItineraryList.length; i++) {
    //         orderOptions.push({ label: i.toString(), value: i });
    //       }
    //       this.orderOptions$.next(orderOptions);
    //     }
    //   });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  addNewTourItinerary() {
    if (this.addNewToDoListForm.invalid) {
      Object.values(this.addNewToDoListForm.controls).forEach((control) => {
        control.markAsDirty();
        control.markAsTouched();
      });
      return;
    }
    const formValues = this.addNewToDoListForm.value;
    const fromTime = `${
      formValues.fromHours ? this.padZero(formValues.fromHours) : '00'
    }:${
      formValues.fromMinutes ? this.padZero(formValues.fromMinutes) : '00'
    }:00`;
    const toTime = `${
      formValues.toHours ? this.padZero(formValues.toHours) : '00'
    }:${formValues.toMinutes ? this.padZero(formValues.toMinutes) : '00'}:00`;
    this.toDoListState.saveToDoList({
      _id: '',
      date: formValues.date
        ? formatDate(new Date(formValues.date), 'YYYY-MM-dd', 'en-US')
        : '',
      fromTime: fromTime,
      toTime: toTime,
      title: formValues.title ?? '',
      description: formValues.description ?? '',
      state: formValues.state ?? 0,
      urgent: formValues.urgent ?? 0,
    });
  }

  padZero(value: string) {
    return value.toString().padStart(2, '0');
  }

  clear(): void {
    this.addNewToDoListForm.reset();
  }

  close() {
    this.uiState.closeAddNewToDoListModal();
  }
}
