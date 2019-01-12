import { Component, OnInit } from "@angular/core";
import { PoloDataService } from '../shared/polo-data.service';

@Component({
    selector: "app-polos",
    templateUrl: "./polos.component.html",
    styleUrls: ["./polos.component.scss"],
    providers:[PoloDataService]
})
export class PolosComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    }
}
