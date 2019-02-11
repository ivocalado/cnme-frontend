import { NgModule } from "@angular/core";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { AppRoutingModule } from "../app-routing.module";
import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule
} from "@angular/material";
import { EstadoService } from "../_shared/services/estado.service";
import { SharedModule } from "../_shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [MainNavComponent],
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
    providers: [EstadoService]
})
export class CoreModule {}