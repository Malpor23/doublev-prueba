import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileComponent } from './mobile/mobile.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    imports: [CommonModule, MobileComponent, RouterLink, RouterLinkActive]
})
export class NavbarComponent {

    isMenu: boolean = false;

    toggleMenu(): void {
        this.isMenu = !this.isMenu;
    }
}
