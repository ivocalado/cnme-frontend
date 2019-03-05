import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule, MatCardModule } from '@angular/material';
import { UsuarioDataService } from './services/usuario-data.service';

@NgModule({
    exports: [MatIconModule, CommonModule, MatCardModule],
    providers: [UsuarioDataService]
})
export class SharedModule {}
