import { Component, OnInit } from "@angular/core";
import { PoloDataService } from '../shared/services/polo-data.service';
import { PoloService } from './polo.service';

@Component({
    selector: "app-polos",
    templateUrl: "./polos.component.html",
    styleUrls: ["./polos.component.scss"],
    providers:[PoloDataService, PoloService]
})
export class PolosComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    }
}
