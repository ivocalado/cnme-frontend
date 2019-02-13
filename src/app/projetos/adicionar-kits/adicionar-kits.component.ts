import { Component, OnInit } from '@angular/core';
import { KitDataService } from 'src/app/_shared/services/kit-data.service';
import { Kit } from 'src/app/_shared/models/kit.model';

@Component({
    selector: 'app-adicionar-kits',
    templateUrl: './adicionar-kits.component.html',
    styleUrls: ['./adicionar-kits.component.scss']
})
export class AdicionarKitsComponent implements OnInit {
    kit: string;
    kits: Kit[];
    constructor(private kitDataService:KitDataService) { }

    ngOnInit() {
        this.kitDataService.getKits().subscribe((kits:Kit[])=>{
            this.kits = kits
        });
    }



}
