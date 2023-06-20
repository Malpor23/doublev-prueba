import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { defaultNotificationConfig, NOTIFICATION_CONFIG_TOKEN } from './notification-config';
import { NotificationComponent } from './notification.component';

@NgModule({
    declarations: [NotificationComponent],
    imports: [CommonModule, OverlayModule],
    exports: [NotificationComponent],
})
export class NotificationModule {
    public static forRoot(config = defaultNotificationConfig): ModuleWithProviders<NotificationModule> {
        return {
            ngModule: NotificationModule,
            providers: [
                {
                    provide: NOTIFICATION_CONFIG_TOKEN,
                    useValue: { ...defaultNotificationConfig, ...config },
                },
            ],
        };
    }
}
