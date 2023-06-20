import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './presentation/shared/components/main-layout';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NotificationModule } from './presentation/shared/components/notification';
import { SearchRepository, UserRepository } from './domain/repositories';
import { SearchImpRepository } from './infrastructure/implementation/search.imp.repository';
import { UserImpRepository } from './infrastructure/implementation/user.imp.repository';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: SearchRepository, useClass: SearchImpRepository },
        { provide: UserRepository, useClass: UserImpRepository },
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MainLayoutComponent,
        AngularSvgIconModule.forRoot(),
        NotificationModule.forRoot(),
    ]
})
export class AppModule { }
