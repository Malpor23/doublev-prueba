import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

describe('PaginationComponent', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;

    const mockSvgLoader = jasmine.createSpyObj( ['getSvg'] );

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PaginationComponent],
            providers: [
                SvgIconRegistryService,
                { provide: SvgLoader, userValue: mockSvgLoader },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        component.config = { currentPage: 1, itemsPerPage: 10 };
        component.maxSize = 10;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Pasando la paginación', () => {
        expect(component.config).toEqual({currentPage: 1, itemsPerPage: 10});
    });

    it('Pasando max size', () => {
        expect(component.maxSize).toEqual(10);
    });
});
