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
    MatDialogModule
} from "@angular/material";
import { EstadoService } from "../_shared/services/estado.service";
import { SharedModule } from "../_shared/shared.module";
import { CommonModule } from "@angular/common";
import { IsOnlineComponent } from './is-online/is-online.component';
import { SnackBarService } from '../_shared/helpers/snackbar.service';

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
        MatSnackBarModule
    ],
    exports: [AppRoutingModule, MainNavComponent],
    providers: [EstadoService, SnackBarService]
})
export class CoreModule {}
