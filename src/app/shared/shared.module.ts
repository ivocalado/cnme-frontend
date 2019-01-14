import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material';

@NgModule({
    exports: [MatIconModule, CommonModule]
})
export class SharedModule {}
