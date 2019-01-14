import { Component, OnInit } from '@angular/core';
import { PoloDataService } from 'src/app/shared/polo-data.service';
import { Polo } from '../polos.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: "app-polo-list",
    templateUrl: "./polo-list.component.html",
    styleUrls: ["./polo-list.component.scss"]
})
export class PoloListComponent implements OnInit {
    polos: Polo[] = [];
    displayedColumns: string[] = ["nome", "estado", "municipio", "actions"];
    constructor(
        private polosDataService: PoloDataService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.fetchPolos();
    }

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    onDelete(id: string) {
        if (confirm("Tem certeza que deseja deletar este Polo?")) {
            this.polosDataService.deletePolo(id).subscribe(res => {
                this.fetchPolos();
            });
        }
    }

    fetchPolos() {
        this.polosDataService.getPolos()
        .subscribe((polos:Polo[]) => {
            this.polos = polos;
        });
    }
}
