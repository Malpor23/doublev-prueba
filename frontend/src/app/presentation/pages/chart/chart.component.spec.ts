import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { SearchUseCase } from '../../../domain/uses-cases';
import { SearchRepository } from '../../../domain/repositories';

describe('ChartComponent', () => {
    let component: ChartComponent;
    let fixture: ComponentFixture<ChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChartComponent],
            providers: [
                SearchUseCase,
                SearchRepository,
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ChartComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('Chart Component creado correctamente', () => {
        expect(component).toBeTruthy();
    });
});
