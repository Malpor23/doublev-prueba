import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../repositories';
import { UserModel } from '../model';

@Injectable({
    providedIn: 'root',
})
export class UserUseCase {

    constructor(private repository:UserRepository) {}

    findOne(login: string): Observable<UserModel> {
        return this.repository.findOne(login);
    }
}
