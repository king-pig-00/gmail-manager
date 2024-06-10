import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';
import { ApiRoutes } from '../constants';
import {
  ToDoListItem,
  ToDoListConfig,
} from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  private http = inject(HttpClient);

  getToDoLists(email: string, password: string) {
    const requestBody = { email, password };
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);
    return this.http.post<{
      success: boolean;
      data: User;
      error?: string;
    }>(`${ApiRoutes.todoList}GetAllLists`, requestBody);
  }

  saveToDoList(config: ToDoListConfig) {
    console.log('da');
    const requestBody = {
      date: '2024-06-10',
      time: '20:10',
      state: 'todo',
      title: 'upwork proposal1',
      description: 'about 3',
    };
    return this.http.post<{
      success: boolean;
      data: string;
      error?: string;
    }>(`${ApiRoutes.todoList}SaveList`, requestBody);
  }
}
