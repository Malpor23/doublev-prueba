import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParams, SearchResponse } from '../base';
import { SearchModel } from '../model';
import { SearchRepository } from '../repositories';

@Injectable({
    providedIn: 'root',
})
export class SearchUseCase {

    constructor(private repository: SearchRepository) {}

    search(query: IParams): Observable<SearchResponse<SearchModel[]>> {
        return this.repository.search(query);
    }
}
