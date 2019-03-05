import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LayoutModule } from "@angular/cdk/layout";
import { AppRoutingModule } from "./app-routing.module";

import { CoreModule } from "./_core/core.module";
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard, Permissions } from "./auth/auth.guard";
import { AuthService } from './_shared/services/auth.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        LayoutModule,
        CoreModule
    ],
    providers: [AuthGuard, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {}
