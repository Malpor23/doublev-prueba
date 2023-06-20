import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { UserUseCase } from '../../../domain/uses-cases';
import { UserRepository } from '../../../domain/repositories';
import { generateUser } from '../../shared/mocks';
import { UserModel } from '../../../domain/model';

fdescribe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    // @ts-ignore
    let userCaseUse: UserUseCase = jasmine.SpyObj<UserUseCase>;

    beforeEach(async () => {
        const userCaseUseSpy = jasmine.createSpyObj('UserUseCase', ['getUser']);

        await TestBed.configureTestingModule({
            imports: [ProfileComponent],
            providers: [
                UserUseCase,
                UserRepository,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get(): string { return '123'; },
                            },
                        },
                    },
                },
                { provide: UserUseCase, useValue: userCaseUseSpy }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Profile Component creado correctamente', () => {
        expect(component).toBeTruthy();
    });

    it('Obteniendo perfil de usuario', () => {
        userCaseUse = TestBed.inject(UserUseCase) as jasmine.SpyObj<UserUseCase>;
        const usersMock: UserModel = generateUser();
        let mockParams: string = usersMock.login;
        userCaseUse.findOne(mockParams).subscribe({
            next: (value: UserModel) => {
                expect(value).toBeTruthy();
                expect(value).toEqual(usersMock);
            }
        });

        component.getUser();
        fixture.detectChanges();
    });
});
