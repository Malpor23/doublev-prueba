import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { SearchUseCase } from '../../../domain/uses-cases';
import {
    defaultNotificationConfig,
    NOTIFICATION_CONFIG_TOKEN,
    NotificationService
} from '../../shared/components/notification';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;

    let config = defaultNotificationConfig;
    let iconService: SvgIconRegistryService;
    const mockSvgLoader = jasmine.createSpyObj( ['getSvg'] );

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UsersComponent],
            providers: [
                SearchUseCase,
                NotificationService,
                SvgIconRegistryService,
                {
                    provide: NOTIFICATION_CONFIG_TOKEN,
                    useValue: { ...defaultNotificationConfig, ...config },
                },
                { provide: SvgLoader, userValue: mockSvgLoader },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
