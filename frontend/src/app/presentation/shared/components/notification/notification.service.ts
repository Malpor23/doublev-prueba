import { Injectable, Injector, Inject } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { NotificationRef } from './notification-ref';
import { NOTIFICATION_CONFIG_TOKEN, NotificationConfig, NotificationData } from './notification-config';
import { NotificationComponent } from './notification.component';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private lastNotification!: NotificationRef;

    constructor(
        private overlay: Overlay,
        private parentInjector: Injector,
        @Inject(NOTIFICATION_CONFIG_TOKEN) private notificationConfig: NotificationConfig
    ) {}

    show(data: NotificationData) {
        const positionStrategy = this.getPositionStrategy();
        const overlayRef = this.overlay.create({ positionStrategy });

        const notificationRef = new NotificationRef(overlayRef);
        this.lastNotification = notificationRef;

        const injector = this.getInjector(data, notificationRef, this.parentInjector);
        const notificationPortal = new ComponentPortal(NotificationComponent, null, injector);

        overlayRef.attach(notificationPortal);

        return notificationRef;
    }

    getPositionStrategy() {
        return this.overlay
            .position()
            .global()
            .top(this.getPosition())
            .right(this.notificationConfig.position?.right + 'px');
    }

    getPosition(): string {
        const lastNotificationIsVisible: HTMLElement = this.lastNotification && this.lastNotification.isVisible();
        const position = lastNotificationIsVisible ? this.lastNotification.getPosition().bottom : this.notificationConfig.position?.top;

        return position + 'px';
    }

    getInjector(data: NotificationData, notificationRef: NotificationRef, parentInjector: Injector) {
        const tokens = new WeakMap();

        tokens.set(NotificationData, data);
        tokens.set(NotificationRef, notificationRef);

        return Injector.create({
            providers: [
                { provide: NotificationData, useValue: data },
                { provide: NotificationRef, useValue: notificationRef },
            ],
        });
    }
}
