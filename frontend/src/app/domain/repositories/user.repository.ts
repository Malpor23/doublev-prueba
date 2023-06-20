import { Observable } from 'rxjs';
import { UserModel } from '../model';

export abstract class UserRepository {
    abstract findOne(login: string): Observable<UserModel>;
}
