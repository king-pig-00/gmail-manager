import { Injectable, inject } from '@angular/core';
import {
    BehaviorSubject,
    Subscription,
    combineLatest,
    debounceTime,
    filter,
    lastValueFrom,
    map,
    switchMap,
    take,
} from 'rxjs';
import { AuthService, StorageService, UserService } from '../services';
// import { debounceTimes } from '../constants';
import { User } from '../models';
// import { AuthToken } from '../configs';

@Injectable({
    providedIn: 'root',
})
export class UserState {
    authService = inject(AuthService);
    userService = inject(UserService);
    storageService = inject(StorageService);
    user$ = new BehaviorSubject<User | undefined>(undefined);
    signin(config: any) {
        // this.authService.login(username, password).subscribe({
        //     next: data => {
        //       this.storageService.saveUser(data);
      
        //       this.isLoginFailed = false;
        //       this.isLoggedIn = true;
        //       this.roles = this.storageService.getUser().roles;
        //       this.reloadPage();
        //     },
        //     error: err => {
        //       this.errorMessage = err.error.message;
        //       this.isLoginFailed = true;
        //     }
        //   });


        // this.updateIsLoading('saveHousingData', 'loading');
        // const editUserId = this.userEditState.editUserId$.getValue();
        // if (!editUserId) {
        //     return Promise.reject('no edit user id');
        // }
        return lastValueFrom(
            this.authService.login(config.email, config.password)
        )
            .then((res) => {
                this.storageService.saveUser(res);
                // this.updateIsLoading('saveHousingData', 'success');
                this.user$.next(res.data);
            })
            .then(() => {
                // this.refresh();
                return Promise.resolve();
            })
            .catch(() => {
                // this.updateIsLoading('saveHousingData', 'error');
            });
    }
    signup(config: any) {
        return lastValueFrom(
            this.authService.register(config.username, config.email, config.password)
        )
            .then((res) => {
                // this.updateIsLoading('saveHousingData', 'success');
                this.user$.next(res.data);
            })
            .then(() => {
                // this.refresh();
                return Promise.resolve();
            })
            .catch(() => {
                // this.updateIsLoading('saveHousingData', 'error');
            });
            
        // this.authService.register(username, email, password).subscribe({
        //     next: data => {
        //       console.log(data);
        //       this.isSuccessful = true;
        //       this.isSignUpFailed = false;
        //     },
        //     error: err => {
        //       this.errorMessage = err.error.message;
        //       this.isSignUpFailed = true;
        //     }
        //   });
    }
}
