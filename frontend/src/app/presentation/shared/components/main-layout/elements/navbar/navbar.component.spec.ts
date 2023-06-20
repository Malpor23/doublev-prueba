import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {ActivatedRoute} from "@angular/router";

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavbarComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get(): string { return 'user'; },
                            },
                        },
                    },
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Component Nabvar creado correctamente', () => {
        expect(component).toBeTruthy();
    });

    it('Nabvar Component inicializado', () => {
        expect(component.isMenu).toBeDefined();
        expect(component.toggleMenu).toBeDefined();
    });
});
