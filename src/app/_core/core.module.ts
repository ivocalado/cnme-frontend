import { NgModule } from "@angular/core";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { AppRoutingModule } from "../app-routing.module";
import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule
} from "@angular/material";
import { EstadoService } from "../_shared/services/estado.service";
import { SharedModule } from "../_shared/shared.module";
import { CommonModule } from "@angular/common";
import { IsOnlineComponent } from './is-online/is-online.component';
import { SnackBarService } from '../_shared/helpers/snackbar.service';
import { AuthService } from '../_shared/services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { ErrorInterceptor } from '../_shared/helpers/error.interceptor';

@NgModule({
    declarations: [MainNavComponent, IsOnlineComponent],
    imports: [
        CommonModule,
        SharedModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatSnackBarModule,
        MatMenuModule
    ],
    exports: [AppRoutingModule, MainNavComponent],
    providers: [
        EstadoService,
        SnackBarService,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ]
})
export class CoreModule {}
