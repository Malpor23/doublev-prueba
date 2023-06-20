import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavbarComponent } from './elements/navbar';

@Component({
    selector: 'main-layout',
    standalone: true,
    templateUrl: './main-layout.component.html',
    imports: [CommonModule, RouterOutlet, NavbarComponent],
    animations: [
        trigger('opacityScale', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(.95)' }),
                animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
            ]),
            transition(':leave', [
                style({ opacity: 1, transform: 'scale(1)' }),
                animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' }))
            ])
        ])
    ]
})
export class MainLayoutComponent {}
