import { Observable } from 'rxjs';
import { IParams, SearchResponse } from '../base';
import { SearchModel } from '../model';

export abstract class SearchRepository {
    abstract search(query: IParams): Observable<SearchResponse<SearchModel[]>>;
}
