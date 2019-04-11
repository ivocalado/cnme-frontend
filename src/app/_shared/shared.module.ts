import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { UsuarioDataService } from './services/usuario-data.service';

@NgModule({
    exports: [MatIconModule, CommonModule, MatCardModule, MatTooltipModule],
    providers: [UsuarioDataService]
})
export class SharedModule {}
