import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9000/angularassignment/user'
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  addUser(user:User): Observable<User>{
    return this.http.post<User>(this.apiUrl, user);
  }
  updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.apiUrl}`,user);
  }

  deleteUser(id:number|undefined): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
