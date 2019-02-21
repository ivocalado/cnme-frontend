import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LayoutModule } from "@angular/cdk/layout";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./home/home.component";

import { CoreModule } from "./_core/core.module";
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard, Permissions } from "./_shared/auth/auth.guard";
import { AuthenticationDataService } from "./_shared/services/authentication-data.service";

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        LayoutModule,
        CoreModule,
    ],
    providers: [AuthGuard, AuthenticationDataService],
    bootstrap: [AppComponent]
})
export class AppModule {}
