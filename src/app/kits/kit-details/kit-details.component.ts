import { Component, OnInit } from '@angular/core';
import { KitDataService } from 'src/app/_shared/services/kit-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Kit } from 'src/app/_shared/models/kit.model';
import { Estado } from 'src/app/_shared/models/estado.model';
import { Municipio } from 'src/app/_shared/models/municipio.model';
import { Localidade } from 'src/app/_shared/models/localidade.model';

@Component({
    selector: 'app-kit-details',
    templateUrl: './kit-details.component.html',
    styleUrls: ['./kit-details.component.scss']
})
export class KitDetailsComponent implements OnInit {
    estado: Estado = new Estado(null, "", "")
    municipio: Municipio = new Municipio(null, "", null);
    localidade: Localidade = new Localidade("", "", "", "", "", "", null, null, this.estado, this.municipio);
    kit: Kit = new Kit("", "", "", "", "", "", "", null, this.localidade);

    constructor(
        private kitDataService: KitDataService,
        private route:ActivatedRoute,
        private router:Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params:Params) =>{
            const kitId = +params["id"];
            this.kitDataService.getKit(kitId).subscribe((kit:Kit) =>{
                this.kit = kit;
            })
        })
    }
    onCancel(){
        this.router.navigate(['/kits'], {relativeTo:this.route});
    }

}
