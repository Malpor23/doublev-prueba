import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { notificationAnimations, NotificationAnimationState } from './notification.animation';
import { NOTIFICATION_CONFIG_TOKEN, NotificationConfig, NotificationData } from './notification-config';
import { NotificationRef } from './notification-ref';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    animations: [notificationAnimations.fadeNotification],
})
export class NotificationComponent implements OnInit, OnDestroy {

    animationState: NotificationAnimationState = 'default';
    private intervalId: number | any;

    constructor(
        readonly data: NotificationData,
        readonly ref: NotificationRef,
        @Inject(NOTIFICATION_CONFIG_TOKEN) public notificationConfig: NotificationConfig
    ) {
        this.data = { ...this.notificationConfig, ...this.data };
    }

    ngOnInit(): void {
        if (this.data.autoClose === true) this.intervalId = setTimeout(() => (this.animationState = 'closing'), this.data.autoCloseTimeout);
    }

    ngOnDestroy(): void {
        if (this.data.autoClose === true) clearTimeout(this.intervalId);
    }

    close(): void {
        this.ref.close();
    }

    onFadeFinished(event: AnimationEvent): void {
        const { toState } = event;
        const isFadeOut: boolean = (toState as NotificationAnimationState) === 'closing';
        const itFinished: boolean = this.animationState === 'closing';

        if (isFadeOut && itFinished) {
            this.close();
        }
    }

}
