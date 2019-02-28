import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material';
import { UsuarioDataService } from './services/usuario-data.service';

@NgModule({
    exports: [MatIconModule, CommonModule],
    providers: [UsuarioDataService]
})
export class SharedModule {}
