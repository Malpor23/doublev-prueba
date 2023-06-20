import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../../domain/model';
import { UserUseCase } from '../../../domain/uses-cases';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user!: UserModel;

    constructor(
        private activatedRoute: ActivatedRoute,
        private userUseCase: UserUseCase
    ) {}

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            let param: string = params.get('user')!;
            this.userUseCase.findOne(param).subscribe({
                next: (resp: UserModel) => {
                    this.user = resp;
                }
            });
        });
    }
}
