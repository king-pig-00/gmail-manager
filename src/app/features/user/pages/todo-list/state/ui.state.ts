import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UIState {
    modals$ = new BehaviorSubject<{
        addNewToDoList: {
            isOpen: boolean;
        };
    }>({
        addNewToDoList: {
            isOpen: false,
        },
    });

    openAddNewToDoListModal() {
        this.modals$.next({
            ...this.modals$.value,
            addNewToDoList: {
                isOpen: true,
            },
        });
    }

    closeAddNewToDoListModal() {
        this.modals$.next({
            ...this.modals$.value,
            addNewToDoList: {
                isOpen: false,
            },
        });
    }
}
