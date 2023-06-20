import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    withPermission(score: number): boolean {
        return score > 30;
    }
}
