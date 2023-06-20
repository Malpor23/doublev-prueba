import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import {defaultNotificationConfig, NOTIFICATION_CONFIG_TOKEN, NotificationConfig} from './notification-config';

describe('NotificationComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotificationComponent],
            declarations: [NotificationComponent],
            providers: [
                NotificationService,
                NOTIFICATION_CONFIG_TOKEN,
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
