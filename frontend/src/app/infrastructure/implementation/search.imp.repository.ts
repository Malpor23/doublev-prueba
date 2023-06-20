import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { SearchRepository } from '../../domain/repositories';
import { IParams, SearchResponse } from '../../domain/base';
import { SearchModel } from '../../domain/model';

@Injectable({
    providedIn: 'root'
})
export class SearchImpRepository extends SearchRepository {

    readonly api: string = 'https://api.github.com/search/';
        constructor(private http: HttpClient) {
        super();
    }

    search(query: IParams): Observable<SearchResponse<SearchModel[]>> {
        return this.http.get<SearchResponse<SearchModel[]>>(
            `${this.api}users?q=${query.filter}&page=${query.page}&per_page=${query.perPage}`
        ).pipe(retry(1), catchError(this.handleError));
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
