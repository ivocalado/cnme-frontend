import { NgModule } from "@angular/core";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { AppRoutingModule } from "../app-routing.module";
import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
} from "@angular/material";
import { EstadoService } from "../shared/services/estado.service";
import { SharedModule } from "../shared/shared.module";
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
        MatListModule
    ],
    exports: [AppRoutingModule, MainNavComponent],
    providers: [EstadoService]
})
export class CoreModule {}
