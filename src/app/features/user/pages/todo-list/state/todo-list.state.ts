import { Injectable, inject } from '@angular/core';
import {
    ToDoListItem,
    ToDoListConfig,
    ToDoListService,
    UIStatus
} from '@app/core';
import { BehaviorSubject, lastValueFrom, take, switchMap, map } from 'rxjs';
import { UIState } from './ui.state';

@Injectable()
export class ToDoListState {
    uiState = inject(UIState);
    toDoListService = inject(ToDoListService);

    status$ = new BehaviorSubject<{
        load: UIStatus;
        save: UIStatus;
    }>({
        load: 'idle',
        save: 'idle',
    });
    
    private refreshTriggered$ = new BehaviorSubject<number>(0);
    private initialized = false;

    

    init(): void {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        this.refreshTriggered$.subscribe(() => {
            // this.tourEditState.tourId$.subscribe((tourId) => {
            //     if (tourId) {
            //         this.tourEditState.loadTourDetails(tourId);
            //     }
            // });
        });
    }

    refresh(): void {
        this.refreshTriggered$.next(new Date().getTime());
    }

    saveToDoList(config: ToDoListConfig): Promise<void> {
        this.status$.next({
            ...this.status$.getValue(),
            save: 'loading',
        });
        return lastValueFrom(
            this.toDoListService.saveToDoList(config)
                .pipe(
                    map((res) => {
                        if (!res.success) {
                            this.status$.next({
                                ...this.status$.getValue(),
                                save: 'error',
                            });
                            throw res.error;
                        }
                        this.status$.next({
                            ...this.status$.getValue(),
                            save: 'success',
                        });
                        return res.data;
                    })
                )
        ).then(() => {
            return Promise.resolve();
        });
    }
}
