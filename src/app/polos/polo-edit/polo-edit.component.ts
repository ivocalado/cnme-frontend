import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoloDataService } from 'src/app/shared/services/polo-data.service';
import { Estado, EstadoService } from 'src/app/shared/services/estado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Polo } from '../../shared/models/polos.model';

@Component({
    selector: 'app-polo-edit',
    templateUrl: './polo-edit.component.html',
    styleUrls: ['./polo-edit.component.scss']
})
export class PoloEditComponent implements OnInit {
    estados:Estado[];
    polo: Polo=new Polo("","","","");
    editMode = false;

    constructor(
        private route: ActivatedRoute,
        private poloDataService: PoloDataService,
        private estadoService:EstadoService,
        private router: Router
    ) { }

    ngOnInit() {
        this.estados = this.estadoService.getEstados();
        let id = this.route.snapshot.paramMap.get("id");
        this.editMode = id != null;
        if (this.editMode) {
            this.poloDataService.getPolo(id).subscribe((polo:Polo)=>{
                this.polo = polo;
            });
        }

    }

    onAddPolo(form: NgForm) {
        const value = form.value;
        if (this.editMode) {
            let id = this.route.snapshot.paramMap.get("id");
            this.poloDataService.updatePolo(id,value)
            .subscribe(res =>{
                this.router.navigate(["/polos"],{relativeTo:this.route});
            })
        } else {
            this.poloDataService
                .storePolo(value)
                .subscribe((polos: Polo[]) => {
                    this.editMode = false;
                    form.reset();
                    this.router.navigate(["../"], { relativeTo: this.route });
                });
        }
    }

    onCancel() {
        this.router.navigate(['/polos'], { relativeTo: this.route })
    }

}
