import { OverlayRef } from '@angular/cdk/overlay';

export class NotificationRef {
    constructor(private readonly overlay: OverlayRef) {}

    close(): void {
        this.overlay.dispose();
    }

    isVisible() {
        return this.overlay && this.overlay.overlayElement;
    }

    getPosition() {
        return this.overlay.overlayElement.getBoundingClientRect();
    }
}
