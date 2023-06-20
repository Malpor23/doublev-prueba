import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { UserRepository } from '../../domain/repositories';
import { UserModel } from '../../domain/model';

@Injectable({
    providedIn: 'root'
})
export class UserImpRepository extends UserRepository {

    readonly api: string = 'https://api.github.com/';

    constructor(private http: HttpClient) {
        super();
    }

    findOne(login: string): Observable<UserModel> {
        return this.http.get<UserModel>(`${this.api}users/${login}`)
            .pipe(retry(1), catchError(this.handleError));
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        return throwError(() => {
            return errorMessage;
        });
    }
}
