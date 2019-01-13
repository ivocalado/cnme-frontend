import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoloDataService } from 'src/app/shared/polo-data.service';
import { Estado, EstadoService } from 'src/app/shared/estado.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-polo-edit',
    templateUrl: './polo-edit.component.html',
    styleUrls: ['./polo-edit.component.scss']
})
export class PoloEditComponent implements OnInit {
    estados: Estado[];
    constructor(
        private route: ActivatedRoute,
        private estadoService: EstadoService,
        private poloDataService: PoloDataService,
        private router: Router
    ) { }

    ngOnInit() {
        this.estados = this.estadoService.getEstados();
    }

    onAddPolo(form: NgForm) {
        this.poloDataService.storePolo(form.value).subscribe((response: Response) => {
            form.reset();
            this.router.navigate(["../"], { relativeTo: this.route });
        });
    }

    onCancel() {
        this.router.navigate(['../'], { relativeTo: this.route })
    }

}
