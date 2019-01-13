import { Component, OnInit } from '@angular/core';
import { PoloDataService } from 'src/app/shared/polo-data.service';
import { Polo } from '../polos.model';
import { PoloService } from '../polo.service';

@Component({
    selector: 'app-polo-list',
    templateUrl: './polo-list.component.html',
    styleUrls: ['./polo-list.component.scss']
})
export class PoloListComponent implements OnInit {
    polos: Polo[];
    displayedColumns: string[] = ['nome', 'estado','municipio'];
    constructor(private poloService:PoloService, private polosDataService: PoloDataService) { }

    ngOnInit() {
        this.polosDataService.getPolos().subscribe((polos:Polo[]) => {
            this.poloService.setPolos(polos);
            this.polos = polos;
        });
    }

}
